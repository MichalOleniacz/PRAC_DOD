const Joi = require("joi");
const mongoose = require("mongoose");

const detailedUsageInfoMongooseSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    required: true,
  },
  cpuUsage: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 4,
  },
  ramUsage: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 4,
  },
  uptime: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    minlength: 5,
    maxlength: 10,
    required: true,
    enum: ["Detailed", "General"],
  },
});

const DetailedUsageInfo = mongoose.model("Detailed", detailedUsageInfoMongooseSchema, "Detailed");

const validateDetailedUsageInfo = (body) => {
  const detailedUsageInfoJoiSchema = Joi.object({
    createdAt: Joi.date().required(),
    cpuUsage: Joi.number().required(),
    ramUsage: Joi.number().required(),
    uptime: Joi.number().required(),
    type: Joi.string().required(),
  });

  return detailedUsageInfoJoiSchema.validate(body);
};

exports.DetailedUsageInfo = DetailedUsageInfo;
exports.validateDetailedUsageInfo = validateDetailedUsageInfo;
