const express = require("express");
const { index } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", index);

module.exports = router;
