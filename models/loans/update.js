'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const update = (req, res, newValues) => {
  db.oneOrNone(`select * from loans_${req.params.appID} where id = $1 and customerid = $2`, [ req.params.loanID, req.params.customerID ])
  .then((data) => {
    if (data) {
      const result = Object.assign(data, newValues);
      const sql = `update loans_${req.params.appID} set created = $1, borrowed = $2 where id = $3 and customerid = $4 returning *;`;
      db.oneOrNone(sql, [ result.created, result.borrowed, req.params.loanID, req.params.customerID ])
      .then((data) => {
        respondJson(res, data);
      })
      .catch((error) => {
        respondJson(res, error, 500);
      });
    } else {
      respondJson(res, { message: `Loan with id ${req.params.loanID} could not be found in app ${req.params.appID} for customer ${req.params.customerID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
