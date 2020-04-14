const cassandra = require('../../db');
const Sentencer = require('sentencer');
const faker = require('faker');


let count = 10000000; //later fetched from new song_count table
let k = count + 1;

    //capitalization helper function
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    getSong = () => {
        //songType1 construct
        const prefix = capitalize(faker.lorem.word());

        const chooseMiddle = Math.floor(Math.random() * 5);
        const middles = ['in the', 'a', 'towards', 'for my']
        const middle = middles[chooseMiddle];

        const noun = capitalize(Sentencer.make("{{ noun }}"));
        const adjective = capitalize(Sentencer.make("{{ adjective }}"));

        const songType1 = `${prefix} ${middle} ${adjective} ${noun}`;
        const songType2 = capitalize(faker.hacker.noun()) + ' ' + capitalize(faker.hacker.ingverb()) + ' ' + capitalize(faker.random.word());

        //randomly choose song type
        const choose = Math.floor(Math.random() * 2);
        const select = [songType1, songType2];
        const songNameType = select[choose];

        return songNameType;
    }

    getSongImage = () => {
        const numPadded = (k%900).toString().padStart(3, '0');
        const songImage = 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.jpg';
        return songImage;
    }

    getSongAudio = () => {
        const numPadded = (k%900).toString().padStart(3, '0');
        const songAudio = 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.mp3';
        return songAudio;
    }

    getArtistName = () => {
        //artist using only name
        const names = faker.name.firstName() + ' ' + faker.name.lastName();

        //artist using acronym for weirdness === unique
        const acronym = capitalize(faker.random.word()) + ' ' + faker.hacker.abbreviation();

        //from Sentencer to generate authentic cool sounding aritsts
        const noun = capitalize(Sentencer.make("{{ noun }}"));
        const adjective = capitalize(Sentencer.make("{{ adjective }}"));
        const coolName = `${adjective} ${noun}`;

        //randomly choose artist type
        let choose = Math.floor(Math.random() * 3);
        let select = [names, acronym, coolName];
        let artistNameType = select[choose];
        
        return artistNameType;
    }

    getGenre = () => {
        //randomly choose genre
        const genres = ['punk', 'metal', 'electronica', 'hardcore punk', 'pop', 'hip hop', 'new wave', 'jazz', 'blues', 'R&B', 'classical', 'rock', 'indie rock', 'mathcore', 'folk', 'country', 'ska', 'grunge', 'trance', 'soul'];
        let chooseGenre = Math.floor(Math.random() * 20);
        let genre = capitalize(genres[chooseGenre]);
        return genre;
    }

    getAlbumName = () => {
       //long unique sounding album name
        const noun = capitalize(Sentencer.make("{{ noun }}"));
        const adjective = capitalize(Sentencer.make("{{ adjective }}"));
        const tackOn = faker.random.word();

        //short unique sounding album name
        const name = faker.name.firstName();
        const nounAlt = capitalize(Sentencer.make("{{ noun }}"));

        let albumType1 = `${adjective} ${noun} in the ${tackOn}`;
        let albumType2 = `${name}'s ${nounAlt}`;

        //randomly choose album type
        let choose = Math.floor(Math.random() * 2);
        let select = [albumType1, albumType2];
        let albumNameType = select[choose];

        return albumNameType;                
    }


exports.newEntry = (req, res) => {

    const songData = {
        _id: k,
        album: getAlbumName(),
        artist: getArtistName(),
        genre: getGenre(),
        song_audio: getSongAudio(),
        song_image: getSongImage(),
        song_name: getSong(),
        upload_date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString().slice(0,10)
    };

    const query = 'INSERT INTO songs (id, song_name, song_image, song_audio, artist, genre, album, upload_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [songData._id, songData.song_name, songData.song_image, songData.song_audio, songData.artist, songData.genre, songData.album, songData.upload_date];
    cassandra.client.execute(query, params, { prepare: true })
      .then(result => {
    
        res.end('song successfully inserted');
      });
  }

  exports.updateSong = (req, res) => {

    const id = req.params.id;
    const genre = getGenre();
    const artist = getArtistName();

    const query = `UPDATE songs SET genre = '${genre}', artist = '${artist}' WHERE id = ${id}`;
    cassandra.client.execute(query)
      .then(result => {
    
        res.end('song successfully updated');
      });
  }

  exports.replaceSong = (req, res) => {

    const id = req.params.id;

    const songData = {
        _id: id,
        album: getAlbumName(),
        artist: getArtistName(),
        genre: getGenre(),
        song_audio: getSongAudio(),
        song_image: getSongImage(),
        song_name: getSong(),
        upload_date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString().slice(0,10)
    };

    const query = 'INSERT INTO songs (id, song_name, song_image, song_audio, artist, genre, album, upload_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [songData._id, songData.song_name, songData.song_image, songData.song_audio, songData.artist, songData.genre, songData.album, songData.upload_date];
    cassandra.client.execute(query, params, { prepare: true })
      .then(result => {
    
        res.end('song successfully overwritten');
      });
  }