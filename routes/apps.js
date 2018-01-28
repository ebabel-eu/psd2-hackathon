'use strict';

const express = require('express');
const router = express.Router();

const create = require('../models/apps/create');
const read = require('../models/apps/read');
const update = require('../models/apps/update');
const list = require('../models/apps/list');

const respondJson = require('../utils/respond-json');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.author || !req.body.contact) {
    return respondJson(res, { message: 'Please POST a JSON payload: name (string - name of your app), author (string), contact (string - e-mail or other details to contact you).' }, 400);
  }

  create(req, res);
});

router.get('/:appID', (req, res, next) => {
  read(req, res);
});

router.put('/:appID', (req, res, next) => {
  update(req, res, req.body);
});

router.delete('/:appID', (req, res, next) => {
  update(req, res, { enabled: false });
});

router.get('/', (req, res, next) => {
  list(res);
});

module.exports = router;
