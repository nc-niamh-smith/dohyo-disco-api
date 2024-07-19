const db = require('../../db/connection.js')
const { arrangeRikishi } = require('../utils.js')
const pg = require('pg-format')

exports.selectStables = async () => {
    const result = await db.query(`SELECT * FROM stables;`)
    return result.rows
}

exports.selectStableById = async (id) => {
    const result = await db.query(`SELECT * FROM stables WHERE stable_id = $1;`, [id])
    if(result.rows.length === 0) return Promise.reject({status: 404, msg: 'ID not found'})
    return result.rows[0]
}

exports.addStable = async (stable_name) => {
    const result = await db.query(`INSERT INTO stables (stable_name) VALUES ($1) RETURNING*`, [stable_name])
    return result.rows[0]
}

// exports.updateStable = async (rikishis, stable_id) => {
//     const nestedRikishi = await arrangeRikishi(rikishis)
//     console.log(nestedRikishi)
//     let queryStr = pg(`UPDATE stables SET rikishi = VALUES %L WHERE stable_id = $1 RETURNING *;`, nestedRikishi)
//     console.log(queryStr)
    
//         const result = await db.query(queryStr, [stable_id])
//     console.log(result.rows)
// }
// //can only take one value at a time