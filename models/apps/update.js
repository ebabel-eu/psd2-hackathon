'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const update = (req, res, newValues) => {
  const sql = `update apps  where id='${req.params.appID}'`;

  db.oneOrNone(sql)
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
