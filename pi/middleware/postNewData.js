const io = require("socket.io-client");
require("dotenv").config();

const socket = io("ws://localhost:9001", {
  reconnectionDelayMax: 10000,
  query: {
    token: process.env.PI_SOCKET_TOKEN,
  },
});

const postNewData = (body, { cb, next }) => {
  console.log("post called", body.type);
  socket.emit(body.type, body);
};

module.exports = postNewData;
