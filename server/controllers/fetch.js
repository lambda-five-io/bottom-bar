const cassandra = require('../../db');

exports.getAll = (req, res) => {

    const query = `SELECT * FROM songs`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.send(result);
      });
  }