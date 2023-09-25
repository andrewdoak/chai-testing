const should = require("chai").should();
const expect = require("chai").expect;
const request = require("supertest");
// THIS IS OUR SERVER
const app = require("../index");

// ALL TESTS USE A DESCRIBE FUNCTION
describe("GET /gifs", () => {
  //tests will be written inside this function
});

// MOCHA HAS THE DESCRIBE/IT FUNCTIONS/METHODS
// DONE IS CALLED WHEN TEST IS FINISHED
describe("GET /gifs", function () {
  // VERIFY RESPONSE: FIRST it BLOCK
  it("SHOULD return a JSON object.", function (done) {
    request(app)
      .get("/gifs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// VERIFY ARRAY: SECOND it BLOCK
it("SHOULD return an array.", (done) => {
  request(app)
    .get("/gifs")
    .set("Accept", "application/json")
    .end((error, response) => {
      expect(response.body).to.be.an("array");
      done();
    });
});

// VERIFY ARRAY HAS 'NAME' FIELD
it("SHOULD return and array of OBJECTS that have the field 'Name'.", (done) => {
  request(app)
    .get("/gifs")
    .set("Accept", "application/json")
    .end((error, response) => {
      response.body.forEach((gif) => {
        expect(gif).to.have.property("name");
      });
      done();
    });
});

// DESCRIBE BLOCK: POST TESTING
// CREATES A GIF, THEN TESTS
describe("POST /gifs", () => {
  const newGif = {
    name: "Beyonce REPEAT Gif",
    url: "https://media.giphy.com/media/3o6ozBUuLfzTCngAFi/giphy.gif",
    tags: ["Beyonce", "Bey"],
  };
  before((done) => {
    request(app)
      .post("/gifs")
      .set("Accept", "application/json")
      .send(newGif)
      .end(done);
  });

  // POST: TEST BLOCK
  it("SHOULD add a GIF to the DB Collection and return it.", (done) => {
    request(app)
      .get("/gifs")
      .set("Accept", "application/json")
      .end((error, response) => {
        expect(response.body.find((gif) => gif.name === newGif.name)).to.be.an(
          "object"
        );
        done();
      });
  });
});

/* 

RUN TEST
Update package.json
Change the test: value

"scripts": {
    "test": "node_modules/.bin/mocha --exit"
  },

npm run test
TEST FUNCTION BREAKDOWN
EXPECT IS THE SAME THING AS "INSERTION"

FIRST BLOCK
1. First step is to request
2. get request
3. accept the request, 
4. expecting .JSON if OK & (FROM SUPERTEST)
5. if 200, done 

SECOND BLOCK 
expect from Chai (can do different things with it)
to.be.an
*/
