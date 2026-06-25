const { getAnalytics } = require("../services/analyticsService");

function index(req, res) {
  res.json(getAnalytics());
}

module.exports = { index };
