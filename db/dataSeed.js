const faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'audiblyBottomPlayer'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

var fakerData = [];

for (var i = 1; i <= 100; i++) {
  var numPadded = i.toString().padStart(3, '0');
  var songData = {
    song_name: i,
    artist_name: faker.name.firstName() + ' ' + faker.name.lastName(),
    song_image: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.jpg',
    song_audio: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.mp3'
    // song_audio: 'https://ccrma.stanford.edu/~jos/mp3/cello.mp3',
  };

  fakerData.push(songData);
}

for (var j = 0; j < fakerData.length; j++) {

  connection.query('INSERT INTO songs (song_name,artist_name,song_image,song_audio) VALUES(?, ?, ?, ?);', [fakerData[j].song_name, fakerData[j].artist_name, fakerData[j].song_image, fakerData[j].song_audio], function(error) {
    if (error) {
      console.error('error inserting item: ', error);
    }
  });

}

connection.end();