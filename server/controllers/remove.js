const cassandra = require('../../db');

exports.deleteSong = (req, res) => {

    const id = req.params.id;

    const query = `DELETE FROM songs WHERE id=${id}`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.end('song deleted');
      });
  }