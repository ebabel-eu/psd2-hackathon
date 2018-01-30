'use strict';

const express = require('express');
const router = express.Router();

const list = require('../models/banks/list');

const respondJson = require('../utils/respond-json');
const cleanString = require('../utils/clean-string');

router.post('/', (req, res, next) => {
  respondJson(res, { message: 'todo: implement post on banks entity.' });
});

router.get('/:bankID', (req, res, next) => {
  respondJson(res, { message: 'todo: implement get on banks entity.' });
});

router.put('/:bankID', (req, res, next) => {
  respondJson(res, { message: 'todo: implement put on banks entity.' });
});

router.delete('/:bankID', (req, res, next) => {
  respondJson(res, { message: 'todo: implement delete on banks entity.' });
});

router.get('/', (req, res, next) => {
  list(req, res);
});

module.exports = router;
