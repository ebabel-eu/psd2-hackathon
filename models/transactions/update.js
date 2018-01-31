'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const update = (req, res, newValues) => {
  db.oneOrNone(`select * from transactions_${req.params.appID} where id = $1 and loanid = $2`, [ req.params.transactionID, req.params.loanID ])
  .then((data) => {
    if (data) {
      const result = Object.assign(data, newValues);
      const sql = `update transactions_${req.params.appID} set timestamp = $1, amount = $2 where id = $3 and loanid = $4 returning *;`;
      db.oneOrNone(sql, [ result.timestamp, result.amount, req.params.transactionID, req.params.loanID ])
      .then((data) => {
        respondJson(res, data);
      })
      .catch((error) => {
        respondJson(res, error, 500);
      });
    } else {
      respondJson(res, { message: `Transaction with id ${req.params.transactionID} could not be found in app ${req.params.appID} for loan ${req.params.loanID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
