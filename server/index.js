//New Relic analytics
require('newrelic');

//Server configuration
const express = require('express');
const app = express();
const port = 3131;
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('./controllers/fetch.js');
const create = require('./controllers/create.js');
const remove = require('./controllers/remove.js');

//________________________________________________________________________________

app.listen(port, () => console.log(`\nAudibly BottomPlayer gyrosyncopating the core matrix on ${port}\n........`));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(require('morgan')('tiny')); 

// ________________________________________________________________________________
// GET API - fetching songs from DB - primary component functionality

app.get('/songs', fetch.getAll);
app.get('/songs/:id', fetch.getSongByID);
app.get('/title', fetch.getSongByName);
app.get('/artist', fetch.getSongsFromArtist);
app.get('/album', fetch.getSongsFromAlbum);
app.get('/genre', fetch.getSongsByGenre);

// ________________________________________________________________________________

// ________________________________________________________________________________
// CREATE API - adding or updating songs from DB - secondary component functionality

app.post('/addSong', create.newEntry);
app.put('/songs/:id', create.replaceSong);
app.patch('/songs/:id', create.updateSong);

// ________________________________________________________________________________

// ________________________________________________________________________________
// DELETE API - adding or updating songs from DB - secondary component functionality

app.delete('/songs/:id', remove.deleteSong);

// ________________________________________________________________________________

//*********************************************************************************

// ________________________________________________________________________________
// Experimental API - for testing and dev

app.get('/samples/albums', fetch.getSampleAlbums);
app.get('/samples/artists', fetch.getSampleArtists);
app.get('/samples/songs', fetch.getSampleTitles);

// ________________________________________________________________________________

module.exports = app;