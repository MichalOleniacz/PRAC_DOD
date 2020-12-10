const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const userMognooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userMognooseSchema.methods.createJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SALT);
};

const User = mongoose.model("User", userMognooseSchema, "User");

const validateUser = (user) => {
  const userJoiSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return userJoiSchema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;
