const Joi = require("joi");

const DetailedUsageInfoSchema = Joi.object({
  createdAt: Joi.date().required(),
  cpuUsage: Joi.string().required().min(2).max(4),
  ramUsage: Joi.string().required().min(2).max(4),
  uptime: Joi.number().required(),
});

module.exports = { DetailedUsageInfoSchema };
