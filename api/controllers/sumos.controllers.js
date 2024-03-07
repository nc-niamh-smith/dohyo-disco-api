const { selectSumos, selectSumoById, addSumo, updateSumoById, removeSumo } = require("../models/sumos.models")


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

exports.postSumo = async (req, res, next) => {
    const newSumo = req.body
    try { 
        const sumo = await addSumo(newSumo)
        res.status(201).send({sumo})
    }
    catch(err) {
        next(err)
    }
}


exports.patchSumoById = async (req, res, next) => {
    const updates = req.body;
    const {id} = req.params;
    try {
        const sumo = await updateSumoById(updates, id)
        res.status(200).send({sumo})
    }
    catch(err) {
        next(err)
    }
}

exports.deleteSumo = async (req, res, next) => {
    const {id} = req.params;
    try {
        await removeSumo(id)
        res.sendStatus(201)
    }
    catch(err) {
        next(err)
    }
}