const db = require('../../db/connection.js')

exports.selectSumos = async () => {
    const result = await db.query(`SELECT * FROM rikishi;`)
    return result.rows
}

exports.selectSumoById = async (id) => {
    const result = await db.query(`SELECT * FROM rikishi WHERE id = $1`, [id])
    if(result.rows.length === 0) return Promise.reject({msg: 'Rikishi not found'})
    return result.rows[0]
}