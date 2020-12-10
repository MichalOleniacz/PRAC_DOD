//    BACKEND HOSTS AN EXPRESS SERVER WITH AN AUTH ENDPOINT
//    ONCE AUTH IS REACHED WITH THE CORRECT REQ, IT RESPONDS WITH A JWT
//    THATS ALSO BEING USED AS SESSION ID FOR THE USER WITHIN THE WEBSOCKET
//
//    JWT ALLOWS TO CREATE A WEBSOCKET CONNECTION WITH THE SERVER
//
//
//
//

const io = require("socket.io")();
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const assert = require("assert");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const SOCKET_PORT = 9001;
const EXPRESS_PORT = 9000;

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@cluster0.e6cry.mongodb.net/PiUsageInfo?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

io.on("connection", (socket) => {
  socket.emit("test", "TESTING");
});
