'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const read = (req, res) => {
  const sql = `delete from loans_${req.params.appID} where id = $1 and customerid = $2;`;

  db.oneOrNone(sql, [ req.params.loanID, req.params.customerID ])
  .then((data) => {
    respondJson(res, { message: `Loan with id ${req.params.loanID} is deleted in app ${req.params.appID} for customer ${req.params.customerID}.` });
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
