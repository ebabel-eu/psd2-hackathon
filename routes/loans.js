'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const create = require('../models/loans/create');
const read = require('../models/loans/read');
const update = require('../models/loans/update');
const remove = require('../models/loans/remove');
const list = require('../models/loans/list');

const respondJson = require('../utils/respond-json');
const cleanString = require('../utils/clean-string');

router.post('/', (req, res, next) => {
  if (!req.body || !req.body.created || !req.body.borrowed) {
    return respondJson(res, { message: 'Please POST a JSON payload: created (timestamp), borrowed (money)' }, 400);
  }

  create(req, res);
});

router.get('/:loanID', (req, res, next) => {
  read(req, res);
});

router.put('/:loanID', (req, res, next) => {
  update(req, res, req.body);
});

router.delete('/:loanID', (req, res, next) => {
  remove(req, res);
});

router.get('/', (req, res, next) => {
  list(req, res);
});

module.exports = router;
