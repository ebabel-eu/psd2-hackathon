'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const update = (req, res, newValues) => {
  db.oneOrNone(`select * from customers_${req.params.appID} where id = $1 and bankid = $2`, [ req.params.customerID, cleanString(req.params.bankID) ])
  .then((data) => {
    if (data) {
      const result = Object.assign(data, newValues);
      const sql = `update customers_${req.params.appID} set name = $1, psd2share = $2 where id = $3 and bankid = $4 returning *;`;
      db.oneOrNone(sql, [ result.name, result.psd2share, req.params.customerID, cleanString(req.params.bankID) ])
      .then((data) => {
        respondJson(res, data);
      })
      .catch((error) => {
        respondJson(res, error, 500);
      });
    } else {
      respondJson(res, { message: `Customer with id ${req.params.customerID} could not be found in app ${req.params.appID} and bank ${req.params.bankID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
