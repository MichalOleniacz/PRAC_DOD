const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
require("dotenv").config();

const url = process.env.MONGO_URL;

const connect = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.error(e));

module.exports = connect;
