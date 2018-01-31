'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');
const guid = require('../../utils/guid');

// Create a new loan.
const create = (req, res) => {
  const newLoan = {
    id: guid(),
    customerid: req.params.customerID,
    created: req.body.created,
    borrowed: req.body.borrowed
  };

  const sql = `insert into loans_${req.params.appID} (id, customerid, created, borrowed) values ($1, $2, $3, $4) returning *`;

  db.one(sql, [newLoan.id, newLoan.customerid, newLoan.created, newLoan.borrowed])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
