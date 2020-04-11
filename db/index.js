const cassandra = require('cassandra-driver');

const contact = ['localhost'];
const dc = 'datacenter1';
const database = 'audiblybottomplayer';

const client = new cassandra.Client({ 
  contactPoints: contact,
  localDataCenter: dc,
  keyspace: database
});

const db = client.connect();

db
  .then(db => console.log(`Connected to Cassandra ^_^ --> ${dc}`))
  .catch(err => {
    console.log(`There was a problem connecting to Cassandra at: ${client.contactPoints}`);
    console.log(err);
  });

module.exports = { db, client };