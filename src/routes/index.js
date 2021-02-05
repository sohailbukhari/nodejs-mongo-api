const express = require("express");
const { version, name, author } = require("../../package.json");
const { unlock } = require("../utils/locker");

const router = express.Router();

router.get("/", unlock, async function (req, res) {
  res.reply({ data: { name, version, author } });
});

module.exports = router;
