'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const api = require('./routes/api');
const v1 = require('./routes/v1');
const apps = require('./routes/apps');
const banks = require('./routes/banks');
const customers = require('./routes/customers');
const loans = require('./routes/loans');
const transactions = require('./routes/transactions');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/api/v1', v1);
app.use('/api/v1/apps', apps);
app.use('/api/v1/:appID/banks', banks);
app.use('/api/v1/:appID/:bankID/customers', customers);
app.use('/api/v1/:appID/:customerID/loans', loans);
app.use('/api/v1/:appID/:loanID/transactions', transactions);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('DEBUG') === 'psd2-loans-hackaton:*' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
