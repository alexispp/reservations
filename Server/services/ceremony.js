const db = require("../models/index.js");
const { Op, col, fn } = require("sequelize");
const moment = require("moment");

const saveCeremony = async (payload) => {
    const newCeremony = new db.ceremony({
        name: payload.name,
        date: payload.date,
        numberOfAssistants: payload.numberOfAssistants,
        timeOptions: JSON.stringify(payload.timeOptions),
        show: JSON.stringify(payload.show)
    });

    return newCeremony.save();
};

const deleteCeremony = async (ceremonyId) => {
    const ceremony = await db.ceremony.findOne({
        where: {
            id: ceremonyId
        }
    });

    ceremony.destroy();
};

const getCeremonies = async () => { 
    return await db.ceremony.findAll({
        where: {
            date: {
                [Op.gte]: moment().format("YYYY-MM-DD")
            }
        },
        order: [["date", "ASC"]]
    });
};

const getAllCeremonies = async () => {
    return await db.ceremony.findAll({
        order: [["date", "ASC"]]
    });
};

const getLastCeremony = async () => {
    const lastCeremony = db.ceremony.findOne({
        where: {
            [Op.and]: [
                {
                    date: {
                        [Op.gte]: moment().format("YYYY-MM-DD")
                    }
                },
                { show: true }
            ]
        }
    });
    return lastCeremony;
};

const getAvailableTimesById = async (payload) => {
    const reservations = await db.reservation.findAll({
        where: { ceremonyId: payload }
    });

    const ceremony = await db.ceremony.findOne({
        where: { id: payload }
    });

    const timeRepetitions = reservations.reduce((acc, curr) => {
        if (acc[curr.time] !== undefined) acc[curr.time] += 1;
        else acc[curr.time] = 1;
        return acc;
    }, {});

    const objResponse = JSON.parse(ceremony.timeOptions).map((curr) => {
        const obj = {
            time: curr,
            available:
                (timeRepetitions[curr] !== undefined
                    ? timeRepetitions[curr] < ceremony.numberOfAssistants
                    : true) && moment(curr, "HH:mm [HS]") > moment().add(1, 'hour')
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
    getAllCeremonies,
    getLastCeremony,
    getAvailableTimesById,
    deleteCeremony
};
