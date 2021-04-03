const express = require("express");

const { saveCeremony, getCeremonies } = require("../controller/ceremony");

const router = express.Router();

router.get("/", getCeremonies);
router.post("/", saveCeremony);

module.exports = router;
