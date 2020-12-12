const cookie = require("cookie");
const bcrypt = require("bcrypt");
const { Session } = require("../models/sessionModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function (socket, next) {
  if (socket.handshake.query.token === process.env.PI_SOCKET_TOKEN) {
    return next();
  }
  const cookies = socket.handshake.headers.cookie
    ? cookie.parse(socket.handshake.headers.cookie)
    : undefined;
  const reqJWT = cookies && cookies["auth-token"];
  if (reqJWT) {
    const decoded = jwt.verify(reqJWT, process.env.JWT_SALT);
    const clientAddress = req.connection.remoteAddress;

    const session = await Session.findOne({ clientID: decoded });
    const valid = await bcrypt.compare(clientAddress, session.clientIP);

    if (valid) {
      return next();
    } else return socket.disconnect(true);
  } else return socket.disconnect(true);
};
