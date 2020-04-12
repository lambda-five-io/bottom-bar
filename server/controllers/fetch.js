const cassandra = require('../../db');

exports.getAll = (req, res) => {

    const query = `SELECT * FROM songs`;
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

    const query = `SELECT * FROM songs_by_genre WHERE song_name='Card Hacking Rubber' ALLOW FILTERING`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsFromArtist = (req, res) => {

    const query = `SELECT * FROM songs_by_artist WHERE artist='Black FTP'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsFromAlbum = (req, res) => {

    const query = `SELECT * FROM songs_by_album WHERE album='Priceless Rate in the viral'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getSongsByGenre = (req, res) => {

    const query = `SELECT * FROM songs_by_genre WHERE genre='Metal'`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }

  exports.getAlbums = (req, res) => {

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