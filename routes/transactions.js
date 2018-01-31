'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const create = require('../models/transactions/create');
const read = require('../models/transactions/read');
const update = require('../models/transactions/update');
const remove = require('../models/transactions/remove');
const list = require('../models/transactions/list');

const respondJson = require('../utils/respond-json');
const cleanString = require('../utils/clean-string');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.timestamp || !req.body.amount) {
    return respondJson(res, { message: 'Please POST a JSON payload: timestamp (bigint), amount (money)' }, 400);
  }

  create(req, res);
});

router.get('/:transactionID', (req, res, next) => {
  read(req, res);
});

router.put('/:transactionID', (req, res, next) => {
  update(req, res, req.body);
});

router.delete('/:transactionID', (req, res, next) => {
  remove(req, res);
});

router.get('/', (req, res, next) => {
  list(req, res);
});

module.exports = router;
