'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const read = (req, res) => {
  const sql = `delete from transactions_${req.params.appID} where id = $1 and loanid = $2;`;

  db.oneOrNone(sql, [ req.params.transactionID, req.params.loanID ])
  .then((data) => {
    respondJson(res, { message: `Transaction with id ${req.params.transactionID} is deleted in app ${req.params.appID} for loan ${req.params.loanID}.` });
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
