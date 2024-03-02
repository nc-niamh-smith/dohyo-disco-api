const express = require('express');
const { getSumos, getSumoById } = require('./controllers/sumos.controllers');

const app = express();

app.get('/api/sumos', getSumos)

app.get('/api/sumos/:id', getSumoById)

app.use((err, req, res, next) => {
    if(err.msg) {
        res.status(404).send({msg: err.msg})
    }
})

module.exports = app