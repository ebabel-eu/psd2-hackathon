'use strict';

const express = require('express');
const router = express.Router();

const create = require('../models/apps/create');
const read = require('../models/apps/read');
const list = require('../models/apps/list');

const respondJson = require('../utils/respond-json');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.author || !req.body.contact) {
    return respondJson(res, { message: 'Please POST a JSON payload: name (string - name of your app), author (string), contact (string - e-mail or other details to contact you).' }, 400);
  }

  /*
  const nameAlreadyExists = store.filter(app =>
    app.name.toLowerCase() === req.body.name.toLowerCase()).length > 0;
  if (nameAlreadyExists) {
    return respondJson(res, { message: `${req.body.name} already exists. If you meant to create a new app, please use a different name. If you wanted more details about this app, please request a GET /app/v1/apps/:appID` }, 400);
  }
  */

  create(req, res);
});

router.get('/:appID', (req, res, next) => {
  read(req, res);
});

router.put('/:appID', (req, res, next) => {
  res.send('todo: implement updating an existing app.');
});

router.delete('/:appID', (req, res, next) => {
  res.send('todo: implement deleting an app.');
});

router.get('/', (req, res, next) => {
  list(res);
});

module.exports = router;
