'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const list = (req, res) => {
  const sql = `select * from loans_${req.params.appID} where customerid = $1;`;

  console.log(sql);

  db.manyOrNone(sql, [ cleanString(req.params.customerID) ])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = list;
