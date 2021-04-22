const db = require("../models/index.js");
const { Op, col, fn } = require("sequelize");
const moment = require("moment");

const saveCeremony = async (payload) => {
  const newCeremony = new db.ceremony({
    name: payload.name,
    date: payload.date,
    numberOfAssistants: payload.numberOfAssistants,
    timeOptions: JSON.stringify(payload.timeOptions),
  });

  return newCeremony.save();
};

const getCeremonies = async () => {
  return await db.ceremony.findAll();
};

const getLastCeremony = async () => {
  const lastCeremony = db.ceremony.findOne({
    where: {
      date: {
        [Op.gt]: moment(),
      },
    },
  });
  return lastCeremony;
};

const getAvailableTimesById = async (payload) => {
  
  const reservations = await db.reservation.findAll({
    where: { ceremonyId: payload },
  });

  const ceremony = await db.ceremony.findOne({
    where: { id: payload },
  });

  const timeRepetitions = reservations.reduce((acc, curr) => {
    if (acc[curr.time] !== undefined) acc[curr.time] += 1;
    else acc[curr.time] = 1;
    return acc;
  }, {});

  const objResponse = JSON.parse(ceremony.timeOptions).map((curr) => {
    a = +1;
    const obj = {
      time: curr,
      available:
        timeRepetitions[curr] !== undefined
          ? timeRepetitions[curr] < ceremony.numberOfAssistants
          : true,
    };
    return obj;
  });

  const isThereOneAvailableTime = objResponse.reduce((acc, curr) => {
    return acc || curr.available;
  }, false);

  // return objResponse;
  return isThereOneAvailableTime ? objResponse : undefined;
};

module.exports = {
  saveCeremony,
  getCeremonies,
  getLastCeremony,
  getAvailableTimesById,
};
