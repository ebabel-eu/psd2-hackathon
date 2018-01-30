'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const create = require('../models/banks/create');
const read = require('../models/banks/read');
const update = require('../models/banks/update');
const list = require('../models/banks/list');

const respondJson = require('../utils/respond-json');
const cleanString = require('../utils/clean-string');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.name || !cleanString(req.body.name)) {
    return respondJson(res, { message: 'Please POST a JSON payload: name (string)' }, 400);
  }

  if (cleanString(req.body.name) === 'apps' || cleanString(req.body.name) === 'banks') {
    return respondJson(res, { message: 'Please select a name that is not a reserved word in this API.' }, 400);
  }

  create(req, res);
});

router.get('/:bankID', (req, res, next) => {
  read(req, res);
});

router.put('/:bankID', (req, res, next) => {
  update(req, res, req.body);
});

router.delete('/:bankID', (req, res, next) => {
  update(req, res, { enabled: false });
});

router.get('/', (req, res, next) => {
  list(req, res);
});

module.exports = router;
