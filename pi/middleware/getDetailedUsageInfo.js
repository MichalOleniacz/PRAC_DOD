const si = require("systeminformation");
const detailedUsageInfoModel = require("../models/detailedUsageInfoSchema");

const getDetailedUsageInfo = async ({ cb, next }) => {
  try {
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
      type: "Detailed",
    };

    if (next) cb(body, detailedUsageInfoModel, next);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getDetailedUsageInfo;
