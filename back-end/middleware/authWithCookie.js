const cookie = require("cookie");
const bcrypt = require("bcrypt");
const { Session } = require("../models/sessionModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function (req, res, next) {
  console.log(req);

  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : undefined;
  const reqJWT = cookies && cookies["auth-token"];
  if (reqJWT) {
    const decoded = jwt.verify(reqJWT, process.env.JWT_SALT);
    const clientAddress = req.connection.remoteAddress;

    const session = await Session.findOne({ clientID: decoded });
    const valid = await bcrypt.compare(clientAddress, session.clientIP);

    if (valid) {
      res.status(302);
      res.setHeader("Location", "/ws");
      return res.end();
    } else next();
  } else next();
};
