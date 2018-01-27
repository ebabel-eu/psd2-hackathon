'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const read = (req, res) => {
  const sql = `select * from apps where id='${req.params.appID}'`;

  db.oneOrNone(sql)
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
