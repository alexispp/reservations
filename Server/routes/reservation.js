const express = require("express");
const db = require("../models/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.reservation.findAll();

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
});

router.post("/", async (req, res) => {
  if (!req.body) res.status(400).send("no body");

  if (!req.body.name)
    res.status(400).send({ type: "error", message: "No se ingreso un nombre" });

  if (!req.body.time || !req.body.timeStamp)
    res.status(400).send("all fields are mandayory");

  try {
    await db.reservation.create({
      name: req.body.name,
      time: req.body.time,
      timeStamp: req.body.timeStamp,
      ceremonyId: req.body.ceremony,
    });
    res
      .status(201)
      .json({ type: "success", message: "Se ha generado la reserva" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ type: "error", message: "No pudimos generar la reserva. Intente nuevamente en unos momentos." });
  }
});

router.post("/getAllByCeremony", async (req, res) => {
  try {
    const result = await db.reservation.findAll({
      where: { ceremonyId: req.body.ceremonyId },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
});

module.exports = router;
