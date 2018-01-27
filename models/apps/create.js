'use strict';

const db = require('../../utils/db');
const guid = require('../../utils/guid');
const respondJson = require('../../utils/respond-json');

// Create an app and all its data.
const create = (req, res) => {
  const newApp = {
    id: guid(),
    name: req.body.name,
    author: req.body.author,
    contact: req.body.contact,
    enabled: true,
    created: Date.now(),
  };

  const sql = 'insert into apps (id, name, author, contact, enabled, created) values ($1, $2, $3, $4, $5, $6) returning id';

  db.one(sql, [newApp.id, newApp.name, newApp.author, newApp.contact, newApp.enabled, newApp.created])
  .then((data) => {
    respondJson(res, data);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
