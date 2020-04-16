const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');
const Sentencer = require('sentencer');

// _________________________________________________________________
// enable writing mock data to csv file exported to Cassandra db later
// _________________________________________________________________


const writerSongs = csvWriter();
const writerSongsByAlbum = csvWriter();
const writerSongsByArtist = csvWriter();
const writerSongsByGenre = csvWriter();

//update paths!
writerSongs.pipe(fs.createWriteStream('./db/seed/CSV/Cassandra/songTableCAS.csv'));
writerSongsByAlbum.pipe(fs.createWriteStream('./db/seed/CSV/Cassandra/albumTableCAS.csv'));
writerSongsByArtist.pipe(fs.createWriteStream('./db/seed/CSV/Cassandra/artistTableCAS.csv'));
writerSongsByGenre.pipe(fs.createWriteStream('./db/seed/CSV/Cassandra/genreTableCAS.csv'));

const cassandraGen = () => {

    const target = 10000000;
    let percentCounter = 0;

    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize Cassandra Table Seeds');
    console.time('Time');

    //target = 10mil primary records
    let k = 0;
    
    let artist = null;
    let genre = null;
    let album = null;
    let upload_date = null;
    
    writeSong();
    function writeSong() {
        let okay = true;

        do {

            k++;

            const progress = k % (target/1000); //confirm every 10000 entries
            const message = k % (target/100); //used for console logging at every 1% completion
            //__________________________________________________________________________


            //capitalization helper function
            const capitalize = (s) => {
                if (typeof s !== 'string') return ''
                return s.charAt(0).toUpperCase() + s.slice(1)
            };

            getSong = () => {
                //songType1 construct
                const prefix = capitalize(faker.lorem.word());

                const chooseMiddle = Math.floor(Math.random() * 9);
                const middles = ['in the', 'the', 'a', 'Towards', 'for My', 'Hacking', 'Grinding', 'Forever', 'to a New'];
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
                const songImage = numPadded;
                return songImage;
            }

            getSongAudio = () => {
                const numPadded = (k%900).toString().padStart(3, '0');
                const songAudio = numPadded;
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
                const genres = ['punk', 'metal', 'electronica', 'hardcore Punk', 'pop', 'hip Hop', 'new Wave', 'jazz', 'blues', 'R&B', 'classical', 'rock', 'indie Rock', 'mathcore', 'folk', 'country', 'ska', 'grunge', 'trance', 'soul'];
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

            if (k % 100 === 1) {
                artist = getArtistName();
            }

            if (k % 10 === 1) {
                genre = getGenre();
                album = getAlbumName();
                upload_date = new Date(+(new Date()) - Math.floor(Math.random()*1000000000000)).toISOString().slice(0,10);
            }

            const songData = {
                _id: k,
                album: album,
                artist: artist,
                genre: genre,
                song_audio: getSongAudio(),
                song_image: getSongImage(),
                song_name: getSong(),
                upload_date: upload_date
            };

            const albumData = {
                album: songData.album,
                song_name: songData.song_name,
                artist: songData.artist,
                genre: songData.genre,
                song_audio: songData.song_audio,
                song_image: songData.song_image,
                upload_date: songData.upload_date
            }

            const artistData = {
                artist: songData.artist,
                song_name: songData.song_name,
                album: songData.album,
                genre: songData.genre,
                song_audio: songData.song_audio,
                song_image: songData.song_image,
                upload_date: songData.upload_date
            }

            const genreData = {
                genre: songData.genre,
                song_name: songData.song_name,
                album: songData.album,
                artist: songData.artist,
                song_audio: songData.song_audio,
                song_image: songData.song_image,
                upload_date: songData.upload_date
            }

            if (k === target) {
                //COMPLETION 
                writerSongs.write(songData, () => {
                    writerSongs.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Song table seeding complete');
                    console.log('\n');
                    });

                writerSongsByAlbum.write(albumData, () => {
                    writerSongsByAlbum.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Ablum table seeding complete');
                    console.log('\n');
                    });

                writerSongsByArtist.write(artistData, () => {
                    writerSongsByArtist.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Artist table seeding complete');
                    console.log('\n');
                    });

                writerSongsByGenre.write(genreData, () => {
                    writerSongs.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Genre table seeding complete');
                    console.timeEnd('Time');
                    console.log('\n');
                    });

            } else {

            okay = writerSongs.write(songData);
            writerSongsByAlbum.write(albumData);
            writerSongsByArtist.write(artistData);
            writerSongsByGenre.write(genreData);
            }

            //PROGRESS
            //__________________________________________________________________________
            if (progress === 0) {
                process.stdout.write(`.`);
            }

            if (message === 0) {
                percentCounter++;
                if (percentCounter === 50) {
                    console.log('\x1b[32m%s\x1b[0m:', 'Halfway to Quantum Enlightenment');
                }
                console.log(`${percentCounter} percent complete.`);
            }
            //__________________________________________________________________________

        } while (k < target && okay);

        if (k < target) {
            // Had to stop early!
            // Write some more once it drains.
            writerSongs.once('drain', writeSong);
        }
    }
};

cassandraGen();