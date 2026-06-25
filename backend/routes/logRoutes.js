const express = require("express");
const { index } = require("../controllers/logController");

const router = express.Router();

router.get("/", index);

module.exports = router;
