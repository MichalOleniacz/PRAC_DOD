const Joi = require("joi");

const DetailedUsageInfoSchema = Joi.object({
  createdAt: Joi.date().required(),
  cpuUsage: Joi.number().required(),
  ramUsage: Joi.number().required(),
  uptime: Joi.number().required(),
  type: Joi.string().required(),
});

module.exports = DetailedUsageInfoSchema;
