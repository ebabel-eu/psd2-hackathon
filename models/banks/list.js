'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const list = (req, res) => {
  const sql = `select * from banks_${req.params.appID};`;

  console.log(sql);

  db.manyOrNone(sql)
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = list;
