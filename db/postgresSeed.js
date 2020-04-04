const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');
// _________________________________________________________________
// enable writing mock data to csv file exported to postgres db later
// _________________________________________________________________


//this is not updated for new schema and uses existing one inhereted from component (mysql)
//...currently can bash 7,000,000 unique entries into a CSV file before crash
//...this is a good foundation to proceed in efficiently generating a CSV file to load into postgreSQL
//...continuing 4.04


const writer = csvWriter();
writer.pipe(fs.createWriteStream('./db/CSV/pgSample.csv'));

const dataGen100k = () => {

    var percentCounter = 0;

    for (var i = 1; i <= 100000; i++) {

        var progress = i % 1000; //confirm every 100 entries
        var message = i % 10000;

        var numPadded = i.toString().padStart(3, '0');
        var songData = {
            song_id: i,
            song_name: faker.hacker.phrase(),
            artist_name: faker.name.firstName() + ' ' + faker.name.lastName(),
            song_image: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.jpg',
            song_audio: 'https://audibly-bp.s3-us-west-1.amazonaws.com/' + numPadded + '.mp3'
        };
        writer.write(songData);

        if (progress === 0) {
            process.stdout.write(`.`);
        }

        if (message === 0) {
            percentCounter++;
            var total = percentCounter * 10;
            console.log(`${total} percent complete.`);
        }
    }

    console.log('Matrix seeding complete. 100k.')
};

dataGen100k();