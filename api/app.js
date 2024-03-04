const express = require('express');
const { getSumos, getSumoById, postSumo } = require('./controllers/sumos.controllers');
const { customErrorHandler, PSQLErrors, serverError } = require('./errors/errors');

const app = express();

app.use(express.json())

app.get('/api/sumos', getSumos)
app.post('/api/sumos', postSumo)

app.get('/api/sumos/:id', getSumoById)

app.use(customErrorHandler)
app.use(PSQLErrors)
app.use(serverError)

module.exports = app