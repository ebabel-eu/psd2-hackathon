'use strict';

const db = require('./db');
const guid = require('./guid');
const randomNames = require('./random-names');

// Generate a lot of data for a new app that has just been created.
const customers = (suffix) => {
  const names = randomNames(1000);

};

// Create the tables that will be filled with data for a single app.
const initializeApp = (appID) => {
  const suffix = appID.replace(/-/g, '_');

  // Create empty tables for a new app.
  db.tx(t => {
    const queries = [
      t.none(`create table customers_${suffix} (id uuid CONSTRAINT customers_pk_${suffix} PRIMARY KEY, name varchar(255), psd2share boolean);`),
      t.none(`create table loans_${suffix} (id uuid CONSTRAINT loans_pk_${suffix} PRIMARY KEY, customerid uuid, balance money);`),
      t.none(`create table transactions_${suffix} (id uuid CONSTRAINT transactions_pk_${suffix} PRIMARY KEY, loanid uuid, timestamp bigint, amount money);`),
    ];
    return t.batch(queries);
  })
    .then(data => {
      customers(suffix);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = initializeApp;
