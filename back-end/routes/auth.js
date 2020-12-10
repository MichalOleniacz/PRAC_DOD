const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let user = {
    email: req.body.email,
    password: req.body.password,
  };
});

module.exports = router;
