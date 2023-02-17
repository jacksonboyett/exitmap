const { pool } = require("../pool-config.js");

async function addComment([text, user_id, exit_id]) {
  return new Promise((resolve) => {
    pool.query(
      "INSERT INTO comments(text, user_id, exit_id) values ($1, $2, $3)",
      [text, user_id, exit_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows);
      }
    );
  });
}

async function getComments(exit_id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `select text, comments.created_at, users.first_name, users.last_name
      from exits
      inner join comments
      on exit_id = exits._id
      join users
      on user_id = users._id
      where exits._id = $1;`,
      [exit_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
}

module.exports = {
  addComment,
  getComments,
};
