const Joi = require("joi");
const mongoose = require("mongoose");

const sessionMongooseSchema = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024,
  },
  clientIP: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024,
  },
});

const Session = mongoose.model("Session", sessionMongooseSchema, "Session");

const validateSession = (body) => {
  const sessionJoiSchema = Joi.object({
    clientID: Joi.string().min(10).max(1024).required(),
    clientIP: Joi.string().min(10).max(1024).required(),
  });

  return sessionJoiSchema.validate(body);
};

exports.Session = Session;
exports.validateSession = validateSession;
