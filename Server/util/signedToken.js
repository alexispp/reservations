const jwt = require("jsonwebtoken");

// const key = require("../keys");

const getSignedToken = (id) =>
  jwt.sign({ _id: id }, "secretKey", { expiresIn: "1hr" });
  // jwt.sign({ _id: id }, key.JWT_SECRET, { expiresIn: "1hr" });

module.exports= getSignedToken;
