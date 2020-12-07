const si = require("systeminformation");
const genrealUsageInfoModel = require("../models/generalUsageInfoSchema");

const getGeneralUsageInfo = async ({ cb, next }) => {
  console.log("getGeneralUsageInfo FIRED");
  try {
    let pid = await process.pid;
    let { containersRunning } = await si.dockerInfo();
    let networkInterfaces = await si.networkInterfaces();
    let { distro } = await si.osInfo();
    let diskInfo = await si.fsSize();
    let nodeVersion = await process.version;
    let freeDiskSpace = diskInfo[0].size / 1e9 - diskInfo[0].used / 1e9;

    let body = {
      createdAt: Date.now(),
      os: distro,
      network: networkInterfaces,
      activeContainers: containersRunning,
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
