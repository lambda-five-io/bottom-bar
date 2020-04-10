/* eslint no-console: ["error", { allow: ["log", "error"] }] */

//New Relic analytics
require('newrelic');

//Server configuration
const express = require('express');
const app = express();
const port = 3131;
const path = require('path');
const bodyParser = require('body-parser');

//Database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'audiblyBottomPlayer',
// });
// connection.connect();

app.listen(port, () => console.log(`Audibly BottomPlayer matriculating the core matrix on ${port}`));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(require('morgan')('combined')); 



// ________________________________________________________________________________
// GET API - fetching songs from DB - primary component functionality
// ________________________________________________________________________________

app.get('/songs', (req, res) => {
  connection.query('SELECT * FROM songs', (err, data) => {
    if (err) {
      console.error('error getting data from db: ', err);
    } else {
      res.send(data);
    }
  });

  // connection.end();
});
