'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const list = (res) => {
  const sql = 'select * from apps';

  db.manyOrNone(sql)
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = list;
