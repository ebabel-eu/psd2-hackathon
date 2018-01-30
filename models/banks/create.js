'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

// Create a new bank.
const create = (req, res) => {
  const newBank = {
    id: cleanString(req.body.name),
    name: req.body.name,
    enabled: true
  };

  const sql = `insert into banks_${req.params.appID} (id, name, enabled) values ($1, $2, $3) returning *`;

  db.one(sql, [newBank.id, newBank.name, newBank.enabled])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
