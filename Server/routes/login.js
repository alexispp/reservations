const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index.js");
const { Op } = require("sequelize");
const router = express.Router();

router.post("/", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  if (username && password) {
    const user = await db.user.findAll({
      where: {
        [Op.and]: [{ username }, { password }],
      },
    });
    if (user[0]) {
      const token = uuidv4();
      //   request.session.loggedin = true;
      request.session.username = username;
      request.session.token = token;
      response.redirect("/admin");
    } else {
      response.status(500).send("Incorrect Username and/or Password!");
    }
  } else {
    response.status(500).send("Please enter Username and Password!");
  }
  response.end();
});

router.get("/", function (request, response) {
  if (request.session.token) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

module.exports = router;
