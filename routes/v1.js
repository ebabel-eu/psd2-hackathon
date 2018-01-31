'use strict';

const express = require('express');
const router = express.Router();

const entityCrud = require('../utils/entity-crud');
const respondJson = require('../utils/respond-json');

// Note: toReturn value is set once rather than each time a
// GET is called because its value is fixed and doesn't need
// to be computed each time.
const toReturn = [];
toReturn.push(entityCrud('apps', ''));
toReturn.push(entityCrud('banks', '/:appID'));
toReturn.push(entityCrud('customers'));
toReturn.push(entityCrud('loans', '/:appID/:customerID'));
toReturn.push(entityCrud('transactions', '/:appID/:loanID'));

router.get('/' , (req, res, next) => {
  respondJson(res, toReturn);
});

module.exports = router;
