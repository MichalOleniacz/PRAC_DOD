const express = require("express");
const si = require("systeminformation");
const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@cluster0.e6cry.mongodb.net/PiUsageInfo?retryWrites=true&w=majority`;

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const app = express();

const PORT = 5000;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  app.listen(PORT);

  const db = client.db(dbName);

  const collection = db.collection(collectionName);

  const getUsageInfo = async () => await si.getAllData();

  const insertNewData = async () => {
    getUsageInfo().then((res) => {
      db.collection(collectionName).insertOne(res);
    });
  };

  setInterval(insertNewData(), 20 * 1000);
});
