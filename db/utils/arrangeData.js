const arrangeStables = (stables) => {
    return stables.map((stable) => {
        return [stable.stable_name]
    })
}

const arrangeUsers = (users) => {
    return users.map((user) => {
        return [user.username, user.stable_name]
    });
}

const arrangeRikishi = (rikishis) => {
    return rikishis.map((rikishi) => {
        return [rikishi.id, rikishi.sumodbId, rikishi.nskId, rikishi.shikonaEn, rikishi.shikonaJp, rikishi.currentRank, rikishi.heya, rikishi.birthDate, rikishi.shusshin, rikishi.height, rikishi.weight, rikishi.debut]
    })
}


module.exports = {arrangeStables, arrangeUsers, arrangeRikishi}