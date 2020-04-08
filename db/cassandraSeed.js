const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');
const Sentencer = require('sentencer');
const Promise = require('bluebird');
Promise.promisifyAll(fs);

// _________________________________________________________________
// enable writing mock data to csv file exported to Cassandra db later
// _________________________________________________________________


const writerSongs = csvWriter();
const writerSongsByAlbum = csvWriter();
const writerSongsByArtist = csvWriter();
const writerSongsByGenre = csvWriter();

writerSongs.pipe(fs.createWriteStream('./db/CSV/Cassandra/songTableCAS.csv'));
writerSongsByAlbum.pipe(fs.createWriteStream('./db/CSV/Cassandra/albumTableCAS.csv'));
writerSongsByArtist.pipe(fs.createWriteStream('./db/CSV/Cassandra/artistTableCAS.csv'));
writerSongsByGenre.pipe(fs.createWriteStream('./db/CSV/Cassandra/genreTableCAS.csv'));

const cassandraGen = () => {

    //target = 10mil primary records
    let k = 0;

    writeSong();
    function writeSong() {
        let okay = true;

        do {

            k++;

            //capitalization helper function
            const capitalize = (s) => {
                if (typeof s !== 'string') return ''
                return s.charAt(0).toUpperCase() + s.slice(1)
            };

            getSong = () => {
                //songType1 construct
                const prefix = faker.lorem.word();

                const chooseMiddle = Math.floor(Math.random() * 5);
                const middles = ['in the', 'a', 'towards', 'for my', '']
                const middle = middles[chooseMiddle];

                const noun = capitalize(Sentencer.make("{{ noun }}"));
                const adjective = capitalize(Sentencer.make("{{ adjective }}"));

                const songType1 = `${prefix} ${middle} ${adjective} ${noun}`;
                const songType2 = faker.hacker.phrase().slice(0,99);

                //randomly choose song type
                const choose = Math.floor(Math.random() * 2);
                const select = [songType1, songType2];
                const songNameType = select[choose];

                return songNameType;
            }

            getSongImage = () => {
                const numPadded = (k%1000).toString().padStart(3, '0');
                const songImage = 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.jpg';
                return songImage;
            }

            getSongAudio = () => {
                const numPadded = (k%1000).toString().padStart(3, '0');
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

            let uploadDate = faker.date.future(10);

            const songData = {
                _id: k,
                song_name: getSong(),
                song_image: getSongImage(),
                song_audio: getSongAudio(),
                artist: getArtistName(),
                genre: getGenre(),
                album: getAlbumName(),
                upload_date: uploadDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
            };

            const albumData = {
                album: songData.album,
                song_name: songData.song_name,
                song_image: songData.song_image,
                song_audio: songData.song_audio,
                artist: songData.artist,
                genre: songData.genre,
                upload_date: songData.upload_date
            }

            const artistData = {
                artist: songData.artist,
                song_name: songData.song_name,
                song_image: songData.song_image,
                song_audio: songData.song_audio,
                genre: songData.genre,
                album: songData.album,
                upload_date: songData.upload_date
            }

            const genreData = {
                genre: songData.genre,
                song_name: songData.song_name,
                song_image: songData.song_image,
                song_audio: songData.song_audio,
                artist: songData.artist,
                album: songData.album,
                upload_date: songData.upload_date
            }

            if (k === 10000000) {
                //COMPLETION 
                writerSongs.write(songData, () => {
                writerSongs.end();
                console.log('\x1b[32m%s\x1b[0m:', 'Song table seeding complete');
                console.timeEnd('Time');
                console.log('\n');
                });

            } else {

            writerSongs.write(songData)
            writerSongsByAlbum.write(albumData)
            writerSongsByArtist.write(artistData)
            writerSongsByGenre.write(genreData)
            }

        } while (k < 100 && okay);

        if (k < 10000000) {
            // Had to stop early!
            // Write some more once it drains.
            writerSongs.once('drain', writeSong);
        }
    }
};

cassandraGen();