'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');
const guid = require('../../utils/guid');

// Create a new customer.
const create = (req, res) => {
  const newCustomer = {
    id: guid(),
    name: req.body.name,
    bankid: cleanString(req.params.bankID),
    psd2share: false
  };

  const sql = `insert into customers_${req.params.appID} (id, name, bankid, psd2share) values ($1, $2, $3, $4) returning *`;

  db.one(sql, [newCustomer.id, newCustomer.name, newCustomer.bankid, newCustomer.psd2share])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
