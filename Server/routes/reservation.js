const express = require("express");
const db = require("../models/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.Reservation.findAll();

    res.send().json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
});

router.post("/", async (req, res) => {
  if (!req.body) res.status(500).send("no body");

  if (!req.body.name || !req.body.time || !req.body.timeStamp)
    res.status(500).send("all fields are mandayory");

  try {
    await db.Reservation.create({
      name: req.body.name,
      time: req.body.time,
      timeStamp: req.body.timeStamp,
    });
    res.send("Ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
});

module.exports = router;
