const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { Session } = require("../models/sessionModel");
const skipLoginWithCookie = require("../middleware/skipLoginWithCookie");
require("dotenv").config();

router.post("/", skipLoginWithCookie, async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.createJWT();

  if (token) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth-token", token, {
        httpOnly: false,
        maxAge: 60 * 60 * 24,
      })
    );
    res.status(302);
    res.setHeader("Location", "/ws");
    return res.end();
  }
});

function validateBody(req) {
  const bodyJoiSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return bodyJoiSchema.validate(req);
}

module.exports = router;
