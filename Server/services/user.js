const bcrypt = require("bcryptjs");

const db = require("../models/index.js");
const { Op } = require("sequelize");
const getSignedToken = require("../util/signedToken");

const createUser = async (payload) => {
  const user = await db.user.findOne({
    where: {
      email: payload.email,
    },
  });

  if (user.length > 0) {
    throw new Error("User already exist");
  }

  const passHashed = await bcrypt.hash(payload.password, 10);
  const newUser = new User({
    email: payload.email,
    password: passHashed,
  });
  return newUser.save();
};

const signInUser = async (payload) => {
  const user = await db.user.findOne({
    where: {
      username: payload.username,
    },
  });

  if (!user) {
    throw new Error("Please enter email or password");
  } else {

    const passDehashed = await bcrypt.compare(payload.password, user.password);

    if (passDehashed) {
      const token = getSignedToken(user._id);
      return token;
    } else {
      throw new Error("Incorrect password or email, try again");
    }
  }
};

module.exports = { createUser, signInUser };
