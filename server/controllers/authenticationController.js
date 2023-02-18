const bodyParser = require("body-parser"); // parser middleware
const session = require("express-session"); // session middleware
const passport = require("passport"); // authentication
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../pool-config.js");

async function addUser([first_name, last_name, email, password]) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users(first_name, last_name, email, password) values($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, password],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows[0]);
      }
    );
  });
}

module.exports = {
  addUser,
};
