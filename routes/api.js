'use strict';

const express = require('express');
const router = express.Router();

const respondJson = require('../utils/respond-json');

router.get('/' , (req, res, next) => {
  respondJson(res, {
    "link": [
      {
         "rel": "List",
         "method": "GET",
         "url": "/api/v1",
         "description": "List all entities and their endpoints for Version 1 of this API."
      },
    ]
  });
});

module.exports = router;
