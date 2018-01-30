'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const cleanString = require('../../utils/clean-string');

const read = (req, res) => {
  const sql = `select * from banks_${req.params.appID} where id = $1;`;

  db.oneOrNone(sql, [ cleanString(req.params.bankID) ])
  .then((data) => {
    if (data) {
      respondJson(res, data);
    } else {
      respondJson(res, { message: `Bank with id ${req.params.bankID} could not be found in app ${req.params.appID}.` }, 404);
    }
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
};

module.exports = read;
