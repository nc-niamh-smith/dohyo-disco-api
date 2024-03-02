const express = require('express');
const { getSumos, getSumoById, postSumo } = require('./controllers/sumos.controllers');

const app = express();

app.use(express.json())

app.get('/api/sumos', getSumos)
app.post('/api/sumos', postSumo)

app.get('/api/sumos/:id', getSumoById)

app.use((err, req, res, next) => {
    console.log(err)
    if(err.msg) {
        res.status(404).send({msg: err.msg})
    }
})

module.exports = app