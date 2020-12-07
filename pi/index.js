const express = require("express");
const scheduler = require("./middleware/scheduler");

const [detailedList, generalList] = require("./eventPipeline");

require("dotenv").config();

const app = express();

scheduler(detailedList, generalList);

const PORT = 5000;
app.listen(PORT);
