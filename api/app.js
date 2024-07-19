const express = require('express');
const { getSumos, getSumoById, postSumo, patchSumoById, deleteSumo } = require('./controllers/sumos.controllers');
const { customErrorHandler, PSQLErrors, serverError } = require('./errors/errors');
const { getStables, getStableById, postStable, patchStable } = require('./controllers/stables.controllers');

const app = express();

app.use(express.json())

app.get('/api/sumos', getSumos)
app.post('/api/sumos', postSumo)

app.get('/api/sumos/:id', getSumoById)
app.patch('/api/sumos/:id', patchSumoById)
app.delete('/api/sumos/:id', deleteSumo)

app.get('/api/stables', getStables)
app.post('/api/stables', postStable);

app.get('/api/stables/:stable_id', getStableById)
// app.patch('/api/stables/:stable_id', patchStable)

app.use(customErrorHandler)
app.use(PSQLErrors)
app.use(serverError)

module.exports = app;