const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
// DONE! --elbert
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    // DONE! --elbert
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session_id VARCHAR(75), name VARCHAR(20), email VARCHAR(50), pw VARCHAR(50), addr1 VARCHAR(50), addr2 VARCHAR(50), city VARCHAR(20), state VARCHAR(20), shipzip INT, phone VARCHAR(20), cctype VARCHAR(20), ccnum VARCHAR(20), ccexp VARCHAR(20), cvv VARCHAR(4), billzip VARCHAR(5))"
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
