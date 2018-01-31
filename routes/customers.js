'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const create = require('../models/customers/create');
const read = require('../models/customers/read');
const update = require('../models/customers/update');
const remove = require('../models/customers/remove');
const list = require('../models/customers/list');

const respondJson = require('../utils/respond-json');
const cleanString = require('../utils/clean-string');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.name) {
    return respondJson(res, { message: 'Please POST a JSON payload: name (string)' }, 400);
  }

  create(req, res);
});

router.get('/:customerID', (req, res, next) => {
  read(req, res);
});

router.put('/:customerID', (req, res, next) => {
  update(req, res, req.body);
});

router.delete('/:customerID', (req, res, next) => {
  remove(req, res);
});

router.get('/', (req, res, next) => {
  list(req, res);
});

module.exports = router;
