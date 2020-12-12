const express = require("express");
const router = express.Router();
const authWithCookie = require("../middleware/authWithCookie");
const { DetailedUsageInfo } = require("../models/piDetailedInfoModel");
const { GeneralInfo } = require("../models/piGeneralInfoModel");

router.get("/", authWithCookie, async (req, res) => {
  const general = await GeneralInfo.find();
  const detailed = await DetailedUsageInfo.find();

  const userRes = { general, detailed };

  res.status(200).send(JSON.stringify(userRes));
});

module.exports = router;
