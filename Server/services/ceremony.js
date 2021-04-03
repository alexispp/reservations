const db = require("../models/index.js");

const saveCeremony = async (payload) => {
  const newCeremony = new db.Ceremony({
    name: payload.name,
    date: payload.date,
    numberOfAssistants: payload.numberOfAssistants,
    timeOptions: JSON.stringify(payload.timeOptions),
  });

  return newCeremony.save();
};

const getCeremonies = async ()=>{
  return await db.Ceremony.findAll();
}

module.exports = { saveCeremony, getCeremonies };
