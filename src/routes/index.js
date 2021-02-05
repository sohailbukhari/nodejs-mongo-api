const express = require('express');
const { version, name, author } = require('../../package.json');
const { unlock } = require('../utils/locker');

const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({ data: { name, version, author } });
});

module.exports = router;
