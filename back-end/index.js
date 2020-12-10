const express = require("express");
const connect = require("./dbConnection");
const cors = require("cors");
require("dotenv").config();

const reg = require("./routes/register");

const SOCKET_PORT = 9001;
const EXPRESS_PORT = 9000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/reg", reg);

app.listen(EXPRESS_PORT, () => console.log(`Listening on PORT ${EXPRESS_PORT}`));
