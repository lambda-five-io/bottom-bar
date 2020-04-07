const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');
const Sentencer = require('sentencer');
// _________________________________________________________________
// enable writing mock data to csv file exported to postgres db later
// _________________________________________________________________

const writerArtist = csvWriter();
const writerAlbum = csvWriter();
const writerSongs = csvWriter();


//__________________________________________________________________________
//**********************  ARTISTS  ************************* 
//__________________________________________________________________________

const artistGen = () => {

    console.time('Time');

    const writeable = fs.createWriteStream('./db/CSV/PostgreSQL/artistTable.csv');
    writerArtist.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;

    for (let i = 1; i <= 100000; i++) {

    const progress = i % 1000; //confirm every 100 entries
    const message = i % 5000; //used for console logging at every 5% completion
    //__________________________________________________________________________

    //capitalization helper function
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      };

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

    const artistData = {
        //reserved for SERIAL id (not needed in seed)
        artist_name: artistNameType
    };

    writerArtist.write(artistData);


//PROGRESS
    //__________________________________________________________________________
    if (progress === 0) {
        process.stdout.write(`.`);
    }

    if (message === 0) {
        percentCounter++;
        let total = percentCounter * 5;
        console.log(`${total} percent complete.`);
    }
    //__________________________________________________________________________
}

//COMPLETION 
writerArtist.end();
console.log('Artist table seeding complete.');
console.timeEnd('Time');
console.log('\n');
};



//__________________________________________________________________________
//**********************  ALBUMS  ************************* 
//__________________________________________________________________________


const albumGen = () => {

    console.time('Time');

    const writeable = fs.createWriteStream('./db/CSV/PostgreSQL/albumTable.csv');
    writerAlbum.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;

    for (let j = 1; j <= 1000000; j++) {

    const progress = j % 10000; //confirm every 10000 entries
    const message = j % 50000; //used for console logging at every 5% completion
    //__________________________________________________________________________

    //capitalization helper function
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      };

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

    let uploadDate = faker.date.future();

    const albumData = {
        //reserved for SERIAL id (not needed in seed)
        album_name: albumNameType,
        upload_date: uploadDate,
        artist_id: j
    };

    writerAlbum.write(albumData);


//PROGRESS
    //__________________________________________________________________________
    if (progress === 0) {
        process.stdout.write(`.`);
    }

    if (message === 0) {
        percentCounter++;
        let total = percentCounter * 5;
        console.log(`${total} percent complete.`);
    }
    //__________________________________________________________________________
}

//COMPLETION 
writerAlbum.end();
console.log('Album table seeding complete.');
console.timeEnd('Time');
console.log('\n');
};



//__________________________________________________________________________
//**********************  SONGS  ************************* 
//__________________________________________________________________________

const songGen = () => {

    console.time('Time');

    const writeable = fs.createWriteStream('./db/CSV/PostgreSQL/songTable.csv');
    writerSongs.pipe(writeable);

    //PROGRESS
    let percentCounter = 0;
    //__________________________________________________________________________

    let k = 0;

    writeSong();
    function writeSong() {
    let okay = true;

        do {

            k++;

            const progress = k % 100000; //confirm every 100000 entries
            const message = k % 500000; //used for console logging at every 5% completion
            //__________________________________________________________________________

            //capitalization helper function
            const capitalize = (s) => {
                if (typeof s !== 'string') return ''
                return s.charAt(0).toUpperCase() + s.slice(1)
            };

            //songType1 construct
            const prefix = faker.lorem.word();

            const chooseMiddle = Math.floor(Math.random() * 5);
            const middles = ['in the', 'a', 'towards', 'for my', '']
            const middle = middles[chooseMiddle];

            const noun = capitalize(Sentencer.make("{{ noun }}"));
            const adjective = capitalize(Sentencer.make("{{ adjective }}"));

            const songType1 = `${prefix} ${middle} ${adjective} ${noun}`;
            const songType2 = faker.hacker.phrase();

            //randomly choose song type
            const choose = Math.floor(Math.random() * 2);
            const select = [songType1, songType2];
            const songNameType = select[choose];


            const numPadded = k.toString().padStart(3, '0');

            //randomly choose genre
            const genres = ['punk', 'metal', 'electronica', 'hardcore punk', 'pop', 'hip hop', 'new wave', 'jazz', 'blues', 'R&B', 'classical', 'rock', 'indie rock', 'mathcore', 'folk', 'country', 'ska', 'grunge', 'trance', 'soul'];
            let chooseGenre = Math.floor(Math.random() * 20);
            let genre = capitalize(genres[chooseGenre]);

            const songData = {
                //reserved for SERIAL id (not needed in seed)
                song_name: songNameType,
                song_image: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.jpg',
                song_audio: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.mp3',
                genre: genre,
                album_id: k
            };

            if (k === 10000000) {
                //COMPLETION 
                writerSongs.write(songData, () => {
                writerSongs.end();
                console.log('Song table seeding complete.');
                console.timeEnd('Time');
                console.log('\n');
                });

            } else {

            okay = writerSongs.write(songData);

            }

        //PROGRESS
            //__________________________________________________________________________
            if (progress === 0) {
                process.stdout.write(`.`);
            }

            if (message === 0) {
                percentCounter++;
                let total = percentCounter * 5;
                console.log(`${total} percent complete.`);
            }
            //__________________________________________________________________________
        } while (k < 10000000 && okay);

        if (k < 10000000) {
            // Had to stop early!
            // Write some more once it drains.
            writerSongs.once('drain', writeSong);
        }
    }
};

artistGen();
albumGen();
songGen();
