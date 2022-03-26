require("dotenv").config();
const express = require("express");
const path = require("path");
const { getWords, addWord, searchForTerm, deleteEntry, editEntry } = require("./db.js"); // by default there was no connection from /server/index.js to /server/db.js !!!

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json()); // Elbert, remember to use express.json()!!!

// Define route for getting all the words stored int he da
app.get('/words', (req, res) => {
  console.log('Get received!');
  getWords().then( (data) => {
    res.send(data);
  }).catch( (err) => {
    console.log(err)
  });
});

// Define route for posting a new word to be added to the db
app.post('/words', (req, res) => {
  console.log('Post received!');

  addWord(req.body)
    .then( (data) => res.sendStatus(201))
    .catch( (err) => res.sendStatus(209));
});

// Define route for intiiating a search for a term
app.post('/search', (req, res) => {
  console.log('Post to /search received!');

  searchForTerm(req.body)
    .then( (data) => res.send(data))
    .catch( (err) => res.sendStatus(209));

});

// Define route for deleting a specific record
app.delete('/delete', (req, res) => {
  console.log('Delete request to /delete received!');
  console.log(res);
  deleteEntry(req.body)
    .then( (data) => res.send(data))
    .catch( (err) => res.sendStatus(209));

});

// Define route for updating a specific record
//   the request body should contain three objects, term, newTerm, and new Definition
app.put('/edit', (req, res) => {
  let editObj = req.body;

  editEntry(editObj)
    .then( (data) => res.send(data))
    .catch( (err) => res.sendStatus(209));


});



/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
