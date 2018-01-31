'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const read = (req, res) => {
  const sql = `select * from customers_${req.params.appID} where id = $1 and bankid = $2;`;

  db.oneOrNone(sql, [ req.params.customerID, cleanString(req.params.bankID) ])
  .then((data) => {
    if (data) {
      respondJson(res, data);
    } else {
      respondJson(res, { message: `Customer with id ${req.params.customerID} could not be found in app ${req.params.appID} and bank ${req.params.bankID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
