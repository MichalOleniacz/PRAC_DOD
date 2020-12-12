const Joi = require("joi");

const generalLogSchema = Joi.object({
  createdAt: Joi.date().required(),
  os: Joi.string().required(),
  freeDiskSpace: Joi.number().required(),
  nodeVersion: Joi.string().required(),
  pid: Joi.number().optional(),
  type: Joi.string().max(10),
});

module.exports = generalLogSchema;
