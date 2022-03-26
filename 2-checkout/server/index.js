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

app.post('/f2', (request, response) => {
  console.log(request.session_id);
  console.log(request.body);

  // assume an entry with this session_id is already in the table...
  db.query(`INSERT INTO responses (addr1, addr2, city, state, shipzip, phone) VALUES ('${request.body.addr1}', '${request.body.addr2}', '${request.body.city}', '${request.body.state}', ${request.body.shipzip}, '${request.body.phone}') WHERE session_id = '${request.session_id}'`, (err, results, fields) => {
    response.sendStatus(201);
  });
  db.query(`UPDATE responses SET addr1 = '${request.body.addr1}', addr2 = '${request.body.addr2}' WHERE session_id = '${request.session_id}';`)
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
