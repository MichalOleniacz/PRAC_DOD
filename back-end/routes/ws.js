const { DetailedUsageInfo, validateDetailedUsageInfo } = require("../models/piDetailedInfoModel");
const { GeneralInfo, validateGeneralInfo } = require("../models/piGeneralInfoModel");

const detailedWebSocketRoute = async (req, socket) => {
  const { error } = validateDetailedUsageInfo(req);
  if (error) return;

  socket.to("app").emit("Detailed", JSON.stringify(req));

  const Detailed = new DetailedUsageInfo(req);
  await Detailed.save();
};

const generalWebSocketRoute = async (req, socket) => {
  const { error } = validateGeneralInfo(req);
  if (error) return;

  socket.to("app").emit("General", JSON.stringify(req));

  const General = new GeneralInfo(req);
  await General.save();
};

exports.detailedWebSocketRoute = detailedWebSocketRoute;
exports.generalWebSocketRoute = generalWebSocketRoute;
