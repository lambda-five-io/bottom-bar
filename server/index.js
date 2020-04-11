//New Relic analytics
require('newrelic');

//Server configuration
const express = require('express');
const app = express();
const port = 3131;
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('./controllers/fetch.js')

app.listen(port, () => console.log(`\nAudibly BottomPlayer gyrosyncopating the core matrix on ${port}\n........`));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(require('morgan')('tiny')); 

// ________________________________________________________________________________
// GET API - fetching songs from DB - primary component functionality
// ________________________________________________________________________________

app.get('/songs', fetch.getAll);

module.exports = app;