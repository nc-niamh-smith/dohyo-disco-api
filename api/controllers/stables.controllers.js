const { selectStables } = require("../models/stables.models")


exports.getStables = async (req, res, next) => {
    const stables = await selectStables()
    res.status(200).send({stables})
}