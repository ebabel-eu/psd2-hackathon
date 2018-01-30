'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');

const update = (req, res, newValues) => {
  db.oneOrNone('select * from apps where id = $1', [ req.params.appID ])
  .then((data) => {
    if (data) {
      const result = Object.assign(data, newValues);
      const sql = 'update apps set author = $1, contact = $2, enabled = $3 where id = $4 returning *';
      db.oneOrNone(sql, [ result.author, result.contact, result.enabled, req.params.appID ])
      .then((data) => {
        respondJson(res, data);
      })
      .catch((error) => {
        respondJson(res, error, 500);
      });
    } else {
      respondJson(res, { message: `App with id ${req.params.appID} could not be found.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
