const cassandra = require('../../db');

// ________________________________________________________________________________
// GET API - core functionality
//_________________________________________________________________________________
exports.getAll = (req, res) => {

    const query = `SELECT * FROM songs LIMIT 1000`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongByID = (req, res) => {

    const id = req.params.id;
    const query = `SELECT * FROM songs WHERE id=${id}`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongByName = (req, res) => {

    let song = req.query.song_name;
    const query = `SELECT * FROM songs_by_genre WHERE song_name='${song}' ALLOW FILTERING`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsFromArtist = (req, res) => {

    let artist = req.query.artist;
    const query = `SELECT * FROM songs_by_artist WHERE artist='${artist}'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsFromAlbum = (req, res) => {

    let album = req.query.album;
    const query = `SELECT * FROM songs_by_album WHERE album='${album}'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsByGenre = (req, res) => {

    let genre= req.query.genre;
    const query = `SELECT * FROM songs_by_genre WHERE genre='${genre}'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }




// ________________________________________________________________________________
// GET API - experiment/dev/testing
//_________________________________________________________________________________
  exports.getSampleAlbums = (req, res) => {

    const query = `SELECT * FROM songs limit 90`;
    cassandra.client.execute(query)
      .then(result => {
        let albums = [];
        const songs = result.rows;
        for (let i = 0; i < songs.length; i++) {
            albums.push(songs[i]['album']);
        }
        console.log(albums);
        res.send(albums);
      });
  }

  exports.getSampleArtists = (req, res) => {

    const query = `SELECT * FROM songs limit 90`;
    cassandra.client.execute(query)
      .then(result => {
        let artists = [];
        const songs = result.rows;
        for (let i = 0; i < songs.length; i++) {
            artists.push(songs[i]['artist']);
        }
        console.log(artists);
        res.send(artists);
      });
  }

  exports.getSampleTitles = (req, res) => {

    const query = `SELECT * FROM songs limit 90`;
    cassandra.client.execute(query)
      .then(result => {
        let titles = [];
        const songs = result.rows;
        for (let i = 0; i < songs.length; i++) {
            titles.push(songs[i]['song_name']);
        }
        console.log(titles);
        res.send(titles);
      });
  }