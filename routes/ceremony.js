const express = require("express");

const {
  saveCeremony,
  getCeremonies,
  getAllCeremonies,
  getLastCeremony,
  getAvailableTimesById,
  deleteCeremony,
} = require("../controller/ceremony");

const router = express.Router();

router.get("/", getCeremonies);
router.get("/all", getAllCeremonies);
router.get("/lastCeremony", getLastCeremony);
router.get("/:id/availableTimes", getAvailableTimesById);
router.post("/", saveCeremony);
router.delete("/:id", deleteCeremony);

module.exports = router;
