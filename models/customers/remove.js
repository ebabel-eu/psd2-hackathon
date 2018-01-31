'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const read = (req, res) => {
  const sql = `delete from customers_${req.params.appID} where id = $1 and bankid = $2;`;

  db.oneOrNone(sql, [ req.params.customerID, cleanString(req.params.bankID) ])
  .then((data) => {
    respondJson(res, { message: `Customer with id ${req.params.customerID} is deleted in app ${req.params.appID} and bank ${req.params.bankID}.` });
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
