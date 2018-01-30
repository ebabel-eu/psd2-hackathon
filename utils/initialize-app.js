'use strict';

const db = require('./db');
const guid = require('./guid');
const randomNames = require('./random-names');
const randomIndex = require('./random-index');
const banksToCreate = require('./banks-to-create.json');

// Generate 4 banks for a new app.
const banks = (suffix) => {
  db.tx(t => {
    const queries = banksToCreate.map(bank =>
      t.none(`insert into banks_${suffix} (id, name, enabled) values ('${bank.id}', '${bank.name}', ${bank.enabled});`));
    return t.batch(queries);
  })
    .catch(error => {
      console.log(error);
    });

  return banksToCreate;
};

// Generate several customers for a new app that has just been created.
const customers = (suffix, createdBanks) => {
  db.tx(t => {
    const names = randomNames(1000);
    const queries = names.map(name => {
      const bankid = createdBanks[randomIndex(createdBanks.length)].id;
      t.none(`insert into customers_${suffix} (id, name, bankid, psd2share) values ('${guid()}', '${name}', '${bankid}', false);`);
    });
    return t.batch(queries);
  })
    .catch(error => {
      console.log(error);
    });
};

// Create the tables that will be filled with data for a single app.
const initializeApp = (appID) => {
  const suffix = appID.replace(/-/g, '_');

  // Create empty tables for a new app.
  db.tx(t => {
    const queries = [
      t.none(`create table banks_${suffix} (id varchar(50) CONSTRAINT banks_pk_${suffix} PRIMARY KEY, name varchar(50) NOT NULL UNIQUE, enabled boolean);`),
      t.none(`create table customers_${suffix} (id uuid CONSTRAINT customers_pk_${suffix} PRIMARY KEY, name varchar(255), bankid varchar(50), psd2share boolean);`),
      t.none(`create table loans_${suffix} (id uuid CONSTRAINT loans_pk_${suffix} PRIMARY KEY, customerid uuid, balance money);`),
      t.none(`create table transactions_${suffix} (id uuid CONSTRAINT transactions_pk_${suffix} PRIMARY KEY, loanid uuid, timestamp bigint, amount money);`),
    ];
    return t.batch(queries);
  })
    .then(data => {
      const createdBanks = banks(suffix);
      customers(suffix, createdBanks);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = initializeApp;
