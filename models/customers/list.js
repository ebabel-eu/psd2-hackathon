'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const list = (req, res) => {
  const sql = `select * from customers_${req.params.appID} where bankid = $1;`;

  db.manyOrNone(sql, [ cleanString(req.params.bankID) ])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = list;
