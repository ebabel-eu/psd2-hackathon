'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const update = (req, res, newValues) => {
  db.oneOrNone(`select * from banks_${req.params.appID} where id = $1`, [ cleanString(req.params.bankID) ])
  .then((data) => {
    if (data) {
      const result = Object.assign(data, newValues);
      const sql = `update banks_${req.params.appID} set enabled = $1 where id = $2 returning *`;
      db.oneOrNone(sql, [ result.enabled, cleanString(req.params.bankID) ])
      .then((data) => {
        respondJson(res, data);
      })
      .catch((error) => {
        respondJson(res, error, 500);
      });
    } else {
      respondJson(res, { message: `Bank with id ${req.params.bankID} could not be found in app ${req.params.appID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = update;
