const { selectSumos, selectSumoById } = require("../models/sumos.models")


exports.getSumos = async (req, res, next) => {
    const sumos = await selectSumos()
    res.status(200).send({sumos})
}

exports.getSumoById = async (req, res, next) => {
    try {

        const {id} = req.params;
        const sumo = await selectSumoById(id)
        res.status(200).send({sumo})
    }
    catch(err) {
        next(err)
    }
}