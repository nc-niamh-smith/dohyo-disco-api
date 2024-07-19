const { selectStables, selectStableById, addStable, updateStable } = require("../models/stables.models")

exports.getStables = async (req, res, next) => {
    const stables = await selectStables()
    res.status(200).send({stables})
}

exports.getStableById = async (req, res, next) => {
    const {stable_id} = req.params
    try {
        const stable = await selectStableById(stable_id)
        res.status(200).send({stable})
    }
    catch(err) {
        next(err)
    }
}

exports.postStable = async (req, res, next) => {
    const {stable_name} = req.body;
    const stable = await addStable(stable_name)
    res.status(201).send({stable})
}

// exports.patchStable = async (req, res, next) => {
//     const {stable_id} = req.params;
//     const rikishis = req.body;
//     try {
//         const stable = await updateStable(rikishis, stable_id)
//     }
//     catch(err) {
//         next(err)
//     }
// }