const { getLogs } = require("../services/logService");

function index(req, res) {
  res.json(getLogs());
}

module.exports = { index };
