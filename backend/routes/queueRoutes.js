const express = require("express");
const queueController = require("../controllers/queueController");

const router = express.Router();

router.get("/", queueController.getState);
router.get("/track", queueController.track);
router.post("/tokens", queueController.createToken);
router.post("/call-next", queueController.callNext);
router.patch("/:token/status", queueController.updateStatus);

module.exports = router;
