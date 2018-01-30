'use strict';

const db = require('../../utils/db');
const respondJson = require('../../utils/respond-json');
const initializeApp = require('../../utils/initialize-app');

// Create an app and all its data.
const create = (req, res) => {
  const newApp = {
    id: req.body.name.replace(/ /g, '-').toLowerCase(),
    name: req.body.name,
    author: req.body.author,
    contact: req.body.contact,
    enabled: true,
    created: Date.now(),
  };

  const sql = 'insert into apps (id, name, author, contact, enabled, created) values ($1, $2, $3, $4, $5, $6) returning *';

  db.one(sql, [newApp.id, newApp.name, newApp.author, newApp.contact, newApp.enabled, newApp.created])
  .then((data) => {
    respondJson(res, data);
    initializeApp(newApp.id);
  })
  .catch((error) => {
    respondJson(res, error, 500);
  });
}

module.exports = create;
