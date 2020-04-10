require('newrelic');

/* eslint no-console: ["error", { allow: ["log", "error"] }] */
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3131;
const path = require('path');
// var bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'audiblyBottomPlayer',
});
connection.connect();



app.listen(port, () => console.log(`Example app listening on port ${port}`));

app.use(express.static(path.join(__dirname, '../client/public')));

app.use(require('morgan')('combined')); 

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
