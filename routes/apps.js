const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://username:password@host:port/database');

const respondJson = require('../utils/respond-json');

// temporary store in memory for all apps.
// will be replace by postgreSQL
let id = 0;
const store = [];

router.get('/', (req, res, next) => {
  respondJson(res, store);

  /*
  db.one('SELECT $1 AS value', 123)
    .then((data) => {
      respondJson(res, data.value);
    })
    .catch((error) => {
      respondJson(res, error, 500);
    });
  */
});

router.get('/:appID', (req, res, next) => {
  const result = store.filter(apps =>
    apps.id.toLowerCase() === req.params.appID.toLowerCase());

  respondJson(res, result);
});

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.author || !req.body.contact) {
    return respondJson(res, { message: 'Please POST a JSON payload: name (string - name of your app), author (string), contact (string - e-mail or other details to contact you).' }, 400);
  }

  // todo: check if the name does not already exists.

  const newApp = {
    id,
    name: req.body.name,
    author: req.body.author,
    contact: req.body.contact,
    enabled: true,
    dateCreated: new Date().toLocaleString('nl'),
  };

  store.push(newApp);

  id = id + 1;

  respondJson(res, newApp);
});

router.put('/:appID', (req, res, next) => {
  res.send('todo: implement updating an existing app.');
});

router.delete('/:appID', (req, res, next) => {
  res.send('todo: implement deleting an app.');
});

module.exports = router;
