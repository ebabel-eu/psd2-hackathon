'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const read = (req, res) => {
  const sql = 'select * from apps where id = $1';

  db.oneOrNone(sql, [ req.params.appID.toLowerCase() ])
  .then((data) => {
    if (data) {
      respondJson(res, data);
    } else {
      respondJson(res, { message: `App with id ${req.params.appID} could not be found.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
