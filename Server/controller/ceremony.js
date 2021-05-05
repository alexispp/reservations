const CeremonyServices = require("../services/ceremony");

const getCeremonies = async (_, res) => {
  try {
    const response = await CeremonyServices.getCeremonies();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
};

const getAllCeremonies = async (_, res) => {
  try {
    const response = await CeremonyServices.getAllCeremonies();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
};

const saveCeremony = async (req, res) => {
  const payload = req.body;

  if (!payload) res.status(500).send("no body");

  if (
    !payload.name ||
    !payload.date ||
    !payload.numberOfAssistants ||
    !payload.timeOptions
  )
    res.status(500).send("all fields are mandayory");

  try {
    await CeremonyServices.saveCeremony(payload);
    res.status(201).send('');
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
};

const getLastCeremony = async (_, res) => {
  try {
    const response = await CeremonyServices.getLastCeremony();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
};

const getAvailableTimesById = async (req, res) => {
  try {
    const response = await CeremonyServices.getAvailableTimesById(
      req.params.id
    );
    if (response) res.status(200).json(response);
    else
      res
        .status(202)
        .json({
          message:
            "La ceremonia tiene cupo completo en todos los horarios.\nPara más información, comuniquese con el reverendo Marcos.",
        });
  } catch (error) {
    console.log(error);
    res.status(500).send("error! see the logs");
  }
};

module.exports = {
  saveCeremony,
  getCeremonies,
  getAllCeremonies,
  getLastCeremony,
  getAvailableTimesById,
};
