const db = require('../../db/connection.js')

exports.selectSumos = async () => {
    const result = await db.query(`SELECT * FROM rikishi;`)
    return result.rows
}

exports.selectSumoById = async (id) => {
    const result = await db.query(`SELECT * FROM rikishi WHERE id = $1`, [id])
    if(result.rows.length === 0) return Promise.reject({status: 404, msg: 'Rikishi not found'})
    return result.rows[0]
}


exports.addSumo = async (newSumo) => {
    const {birth_date, current_rank, debut, height, heya, nsk_id, shikona_en, shikona_jp, shusshin, sumoapi_id, sumodb_id, weight} = newSumo;
    const result = await db.query(`INSERT INTO rikishi (birth_date, current_rank, debut, height, heya, nsk_id, shikona_en, shikona_jp, shusshin, sumoapi_id, sumodb_id, weight) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING*`, [birth_date, current_rank, debut, height, heya, nsk_id, shikona_en, shikona_jp, shusshin, sumoapi_id, sumodb_id, weight])
    return result.rows[0]
}