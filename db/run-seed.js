const seed = require("./seed");
const {users, rikishi, stables} = require('./test-data/index')

seed({users, stables, rikishi})