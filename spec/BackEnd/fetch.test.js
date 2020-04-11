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
              expect(res.body.rows.length).to.equal(5000); 
              done();
            });
        });
      });

});