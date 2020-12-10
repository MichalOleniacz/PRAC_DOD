const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const { User, validateUser } = require("../models/userModel");
const { Session, validateSession } = require("../models/sessionModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User alread registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  let userSession = { clientID: user._id };

  const salt = await bcrypt.genSalt(10);
  const sessionSalt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  userSession.clientIP = await bcrypt.hash(req.connection.remoteAddress, sessionSalt);

  await user.save();

  const { sessionError } = validateSession(userSession);
  if (!sessionError) {
    const session = new Session(_.pick(userSession, ["clientID", "clientIP"]));
    await session.save();
  }

  const token = user.createJWT();
  if (token) {
    res.status(302);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth-token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      })
    );
    res.setHeader("Location", "/ws");
    res.send(_.pick(user, ["_id", "name", "email"]));
    return res.end();
  }
});

module.exports = router;
