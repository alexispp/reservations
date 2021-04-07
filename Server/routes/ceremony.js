const express = require("express");

const {
  saveCeremony,
  getCeremonies,
  getLastCeremony,
  getAvailableTimesById
} = require("../controller/ceremony");

const router = express.Router();

router.get("/", getCeremonies);
router.get("/lastCeremony", getLastCeremony);
router.get("/:id/availableTimes", getAvailableTimesById);
router.post("/", saveCeremony);

module.exports = router;
