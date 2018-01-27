const pgp = require('pg-promise')(/*options*/);

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT
} = process.env;

const db = pgp(`postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/psd2hackathon`);

module.exports = db;
