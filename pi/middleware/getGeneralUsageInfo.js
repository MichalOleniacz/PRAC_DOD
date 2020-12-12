const si = require("systeminformation");
const genrealUsageInfoModel = require("../models/generalUsageInfoSchema");

const getGeneralUsageInfo = async ({ cb, next }) => {
  try {
    let pid = await process.pid;
    let { distro } = await si.osInfo();
    let diskInfo = await si.fsSize();
    let nodeVersion = await process.version;
    let freeDiskSpace = diskInfo[0].size / 1e9 - diskInfo[0].used / 1e9;

    let body = {
      createdAt: Date.now(),
      os: distro,
      freeDiskSpace,
      nodeVersion,
      pid,
      type: "General",
    };

    if (cb) cb(body, genrealUsageInfoModel, next);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGeneralUsageInfo;
