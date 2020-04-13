const app = require('../../server');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('BottomPlayer API Integration Tests', function() {

    describe('#GET / songs', function() { 
        it('should fetch batch of 5000 (get all)', function(done) { 
          request(app) .get('/songs')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array'); 
              expect(res.body.rowLength).to.equal(5000); 
              done();
            });
        });
      });

    describe('#GET / songs/:id', function() { 
        it('should fetch a single song by ID', function(done) { 
          request(app) .get('/songs/123456')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array'); 
              expect(res.body.rowLength).to.equal(1);
              expect(res.body.columns).to.be.an('array');
              expect(res.body.columns.length).to.equal(8);
              expect(res.body.rows[0]['id']).to.equal(123456); 
              done();
            });
        });
      });

      describe('#GET / title/?song_name="xyz"', function() { 
        it('should fetch a single song by name', function(done) { 
          request(app) .get('/title?song_name=Card Hacking Rubber')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array');
              expect(res.body.columns).to.be.an('array');
              expect(res.body.columns.length).to.equal(7);
              expect(res.body.rows[0]['song_name']).to.equal('Card Hacking Rubber'); 
              done();
            });
        });
      });

      describe('#GET / artist/?artist_name="Jane Doe"', function() { 
        it('should fetch all songs by an artist', function(done) { 
          request(app) .get('/artist?artist=Black FTP')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array');
              expect(res.body.columns).to.be.an('array');
              expect(res.body.columns.length).to.equal(7);
              expect(res.body.rows[0]['artist']).to.equal('Black FTP'); 
              done();
            });
        });
      });

      describe('#GET / album?album="abc"', function() { 
        it('should fetch all songs from an album', function(done) { 
          request(app) .get('/album?album=Priceless Rate in the viral')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array');
              expect(res.body.columns).to.be.an('array');
              expect(res.body.columns.length).to.equal(7);
              expect(res.body.rows[0]['album']).to.equal('Priceless Rate in the viral'); 
              done();
            });
        });
      });

      describe('#GET / genre?genre="awesome"', function() { 
        it('should fetch all songs from a genre', function(done) { 
          request(app) .get('/genre?genre=Metal')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body.rows).to.be.an('array');
              expect(res.body.columns).to.be.an('array');
              expect(res.body.columns.length).to.equal(7);
              expect(res.body.rows[0]['genre']).to.equal('Metal'); 
              done();
            });
        });
      });

});