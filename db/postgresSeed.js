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


const writer = csvWriter();

//generate arrays to hold objects so data consistency is maintained throughout tables
let artists = [];
let albums = [];
let songs = [];



const artistGen = () => {

    writer.pipe(fs.createWriteStream('./db/CSV/PostgreSQL/artistTable.csv'));

    let percentCounter = 0;

    for (let i = 1; i <= 100000; i++) {

    const progress = i % 1000; //confirm every 100 entries
    const message = i % 5000; //used for console logging at every 5% completion

    //capitalization helper function
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      };

    let choose = Math.floor(Math.random() * 3);
    const names = faker.name.firstName() + ' ' + faker.name.lastName();
    const acronym = capitalize(faker.random.word()) + ' ' + faker.hacker.abbreviation();

    //from Sentencer to generate authentic sounding aritsts

    const noun = capitalize(Sentencer.make("{{ noun }}"));
    const adjective = capitalize(Sentencer.make("{{ adjective }}"));
    const coolName = `${adjective} ${noun}`;

    let select = [names, acronym, coolName];
    let artistNameType = select[choose];

    const artistData = {
        //reserved for SERIAL id (not needed in seed)
        artist_name: artistNameType
    };

    artists.push(artistData);
    writer.write(artistData);

    if (progress === 0) {
        process.stdout.write(`.`);
    }

    if (message === 0) {
        percentCounter++;
        let total = percentCounter * 5;
        console.log(`${total} percent complete.`);
    }
}

let sample = Math.floor(Math.random() * 100000);
console.log('here is a sample artist name: ' + artists[sample]['artist_name']);
console.log('Artist table seeding complete.');
};

artistGen();
