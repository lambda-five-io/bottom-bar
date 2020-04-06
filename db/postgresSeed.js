const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');
const Sentencer = require('sentencer');
// _________________________________________________________________
// enable writing mock data to csv file exported to postgres db later
// _________________________________________________________________


//this is not updated for new schema and uses existing one inhereted from component (mysql)
//...currently can bash 7,000,000 unique entries into a CSV file before crash
//...this is a good foundation to proceed in efficiently generating a CSV file to load into postgreSQL
//...continuing 4.04


const writerArtist = csvWriter();
const writerAlbum = csvWriter();
const writerSongs = csvWriter();

//generate arrays to hold objects so data consistency is maintained throughout tables
let artists = [];
let albums = [];
let songs = [];
//___________________________________________________________________________________



//__________________________________________________________________________
//**********************  ARTISTS  ************************* 
//__________________________________________________________________________

const artistGen = () => {

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

    artists.push(artistData);
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
let sample = Math.floor(Math.random() * 100000);
console.log('here is a sample artist name: ' + artists[sample]['artist_name']);
console.log('Artist table seeding complete.');
};



//__________________________________________________________________________
//**********************  ALBUMS  ************************* 
//__________________________________________________________________________


const albumGen = () => {

    const writeable = fs.createWriteStream('./db/CSV/PostgreSQL/albumTable.csv');
    writerAlbum.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;

    for (let j = 1; j <= 1000000; j++) {

    const progress = j % 10000; //confirm every 1000 entries
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

    albums.push(albumData);
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
let sample = Math.floor(Math.random() * 1000000);
console.log('id value ' + albums[sample]['artist_id']);
console.log('here is a sample album name: ' + albums[sample]['album_name']);
console.log('Album table seeding complete.');
};

artistGen();
albumGen();
