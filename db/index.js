const cassandra = require('cassandra-driver');

const contact = ['54.89.84.34'];
const dc = 'us-east';
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
    console.log(`There was a problem connecting to Cassandra at: ${contact}`);
    console.log(err);
  });

module.exports = { db, client };