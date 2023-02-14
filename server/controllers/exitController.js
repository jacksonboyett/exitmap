const { pool } = require('../pool-config.js');

async function addExit([
  name,
  description,
  type,
  heightImpact,
  heightLanding,
  lat,
  long,
  city, 
	state,
  country,
]) {
  return new Promise((resolve) => {
    pool.query(
      `INSERT INTO exits(name, description, type, heightImpact, heightLanding, lat, long, city, state, country) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [name, description, type, heightImpact, heightLanding, lat, long, city, state, country],
      (err, results) => {
        if (err) throw err;
        resolve(results.rows[0]);
      }
    );
  });
}

async function getExits() {
  return new Promise((resolve) => {
    pool.query("SELECT * FROM exits", (err, results) => {
      if (err) {
        console.log(err);
        throw(err);
      }
      resolve(results.rows)
    })
  })
}

module.exports = {
	addExit,
  getExits
}
