const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary'); // this step is REQUIRED for the connection from our Node JS server to Mongo!

const wordSchema = new mongoose.Schema({
  term: {type: String, unique: true},
  definition: {type: String}
});

const Word = mongoose.model('Word', wordSchema);

const handleDuplicate = function(error) {
  console.log('Error, probably duplicate related');
}

const getWords = function() {
  return new Promise ( (resolve, reject) => {
    Word.find().then ( (data) => {
      resolve(data);
    }).catch( (err) => {reject(err); console.log('database error thing');})
  });
}

const addWord = function(wordObject) {
  return new Promise ( (resolve, reject) => {
    Word.create({term: wordObject.term, definition: wordObject.definition}).then ( (data) => {
      console.log(data);
      resolve(data);
    }).catch( (err) => {reject(err); console.log('database error thing');})
  });
}

const searchForTerm = function(searchObject) {
  const regexTerm = new RegExp(`${searchObject.term}`)

  return new Promise ( (resolve, reject) => {
    Word.find({term: regexTerm })
      .then ( (data) => {
        console.log(data);
        resolve(data);
      }).catch( (err) => {reject(err); console.log('database error thing');})
  });
}

const deleteEntry = function(deleteObject) {

  return new Promise ( (resolve, reject) => {
    Word.deleteOne({term: deleteObject.term})
      .then ( (data) => {
        resolve(data);
      }).catch ( (err) => {reject(err); console.log('database error thing')});

  });

}

const editEntry = function(editObject) {

  return new Promise ( (resolve, reject) => {
    Word.replaceOne({term: editObject.term},{term: editObject.newTerm, definition: editObject.newDefinition})
      .then( (data) => {
        resolve(data);
      }).catch( (err) => {reject(err); console.log('database error thing')});

  });

}




module.exports.getWords = getWords;
module.exports.addWord = addWord;
module.exports.searchForTerm = searchForTerm;
module.exports.deleteEntry = deleteEntry;
module.exports.editEntry = editEntry;

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
