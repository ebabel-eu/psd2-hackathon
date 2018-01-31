'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');
const guid = require('../../utils/guid');

// Create a new transaction.
const create = (req, res) => {
  const newTransaction = {
    id: guid(),
    loanid: req.params.loanID,
    timestamp: req.body.timestamp,
    amount: req.body.amount
  };

  const sql = `insert into transactions_${req.params.appID} (id, loanid, timestamp, amount) values ($1, $2, $3, $4) returning *`;

  db.one(sql, [newTransaction.id, newTransaction.loanid, newTransaction.timestamp, newTransaction.amount])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
