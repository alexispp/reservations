const CeremonyServices = require("../services/ceremony");

const getCeremonies = async (_, res)=>{
    try {
        const response = await CeremonyServices.getCeremonies();
        res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("error! see the logs");
    }
}

const saveCeremony = async (req, res)=>{
    const payload = req.body;
    
    if (!payload) res.status(500).send("no body");

    if (!payload.name || !payload.date || !payload.numberOfAssistants || !payload.timeOptions)
      res.status(500).send("all fields are mandayory");
  
    try {
        await CeremonyServices.saveCeremony(payload);
        res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("error! see the logs");
    }
}

module.exports = { saveCeremony, getCeremonies };