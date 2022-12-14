require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

app.use(express.json());

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// Other Routes

// Post request upon submission of f1
app.post('/f1', (request, response) => {
  console.log(request.session_id);
  console.log(request.body);
  // deal with situation where session id already is in the table
  db.query(`INSERT INTO responses (session_id, name, email, pw) VALUES ('${request.session_id}', '${request.body.name}', '${request.body.email}', '${request.body.pw}')`, (err, results, fields) => {
    response.sendStatus(201);
  });
});

// Post request upon submission of f2
app.post('/f2', (request, response) => {
  console.log(request.session_id);
  console.log(request.body);
  // REMEMBER: You CANNOT use INSERT with WHERE
  db.query(`UPDATE responses SET addr1 = '${request.body.addr1}', addr2 = '${request.body.addr2}', city = '${request.body.city}', state = '${request.body.state}', shipzip = ${parseInt(request.body.shipzip)}, phone = '${request.body.phone}' WHERE session_id = '${request.session_id}';`, (err, results, fields) => {
    response.sendStatus(201);
  });
});

// Post request upon submission of f3
app.post('/f3', (request, response) => {
  console.log(request.session_id);
  console.log(request.body);
  // TO DO: write the query for f3 // DONE
  db.query(`UPDATE responses SET cctype= '${request.body.cctype}', ccnum='${request.body.ccnum}', ccexp='${request.body.ccexp}', cvv='${request.body.cvv}', billzip='${request.body.billzip}' WHERE session_id = '${request.session_id}';`, (err, results, fields) => {
    response.sendStatus(201); // it is imperative that you send a 201 or the cycle is incomplete!
  });
});

// Get request to fetch data from database based on session id
app.get('/data', (request, response) => {
  let session_id = request.session_id;
  db.query(`SELECT * FROM responses WHERE session_id='${session_id}'`, (err, results, fields) => {
    // decide what to do with the results array
    if (results.length > 0) {
      response.send(results);
    } else {
      response.send([]);
    }
  });

});
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
