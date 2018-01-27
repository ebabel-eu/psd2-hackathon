'use strict';

const respondJson = (res, toReturn, httpStatus = 200) => {
  res.status(httpStatus);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.send(JSON.stringify(toReturn, null, 3));
}

module.exports = respondJson;
