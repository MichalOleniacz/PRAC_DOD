const express = require("express");
const si = require("systeminformation");
const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;

const { DetailedUsageInfoSchema } = require("./models/detailedUsageInfoSchema");

require("dotenv").config();

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@cluster0.e6cry.mongodb.net/PiUsageInfo?retryWrites=true&w=majority`;

const dbName = process.env.DB_NAME;
const generalCollectionName = process.env.GENERAL_INFO_COL_NAME;
const detailedCollectionName = process.env.DETAILED_INFO_COL_NAME;

const app = express();

const PORT = 5000;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    assert.equal(null, err);
    app.listen(PORT);

    const db = client.db(dbName);

    const detailedCollection = db.collection(detailedCollectionName);

    const getDetailedUsageInfo = async () => {
      let { currentload } = await si.currentLoad();
      let { total, free, used } = await si.mem();
      let { uptime } = await si.time();
      let cpuUsagePercentage = `${Math.round(currentload)}%`;
      let ramUsagePercentage = `${Math.round(((used / 1e9) * 100) / (total / 1e9))}%`;

      let body = {
        createdAt: Date.now(),
        cpuUsage: cpuUsagePercentage,
        ramUsage: ramUsagePercentage,
        uptime,
      };

      try {
        const value = await DetailedUsageInfoSchema.validateAsync(body);
        detailedCollection.insertOne(value).catch((err) => console.log(err));
      } catch (error) {
        if (error) {
          console.log(error);
          return;
        }
      }

      return body;
    };

    setInterval(() => getDetailedUsageInfo(), 20 * 1000);
  }
);
