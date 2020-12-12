const Joi = require("joi");
const mongoose = require("mongoose");

const generalInfoMongooseSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  // network: {
  // type: Array,
  // required: true,
  // },
  // activeContainers: {
  //   type: Number,
  //   required: true,
  // },
  nodeVersion: {
    type: String,
    required: true,
  },
  freeDiskSpace: {
    type: Number,
    required: true,
  },
  pid: {
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

const GeneralInfo = new mongoose.model("General", generalInfoMongooseSchema, "General");

const validateGeneralInfo = (body) => {
  const generalInfoJoiSchema = Joi.object({
    createdAt: Joi.date().required(),
    os: Joi.string().required(),
    // network: Joi.array().required(),
    // activeContainers: Joi.number().required(),
    freeDiskSpace: Joi.number().required(),
    nodeVersion: Joi.string().required(),
    pid: Joi.number().optional(),
    type: Joi.string().max(10),
  });

  return generalInfoJoiSchema.validate(body);
};

exports.GeneralInfo = GeneralInfo;
exports.validateGeneralInfo = validateGeneralInfo;
