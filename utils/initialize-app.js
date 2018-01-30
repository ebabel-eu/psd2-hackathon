'use strict';

const db = require('./db');
const guid = require('./guid');
const randomNames = require('./random-names');
const randomIndex = require('./random-index');
const banksToCreate = require('./banks-to-create.json');
const cleanString = require('./clean-string');
const randomTimestamp = require('./random-timestamp');

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

// Generate several customers, their loans and their transactions for a new app that has just been created.
const customers = (suffix, createdBanks) => {
  db.tx(t => {
    const names = randomNames(1000);
    const queries = names.map(name => {
      // Insert a customer.
      const bankid = createdBanks[randomIndex(createdBanks.length)].id;
      const customerid = guid();
      const loanid = guid();
      const created = randomTimestamp();
      t.none(`insert into customers_${suffix} (id, name, bankid, psd2share) values ('${customerid}', '${name}', '${bankid}', false);`);

      // Random initial transaction, i.e. borrowing money.
      const createdDate = new Date(created);
      let monthlyIncrement = 0;
      const initialAmount = -Math.round(Math.ceil(Math.random() * 25000 + 3000) / 1000) * 1000;
      t.none(`insert into loans_${suffix} (id, customerid, created, borrowed) values ('${loanid}', '${customerid}', ${created}, ${Math.abs(initialAmount)});`);

      // Generate 10 random transactions per loan.
      let month = 0;
      const transactions = new Array(10).fill({}).map(transaction => {
        monthlyIncrement = monthlyIncrement + 1;
        return {
          id: guid(),
          loanid,
          timestamp: new Date(created).setMonth(createdDate.getMonth() + monthlyIncrement),
          amount: Math.round(Math.ceil(Math.random() * 100 + 10) / 10) * 10
        }
      });

      // Insert the initial transaction at the start.
      transactions.unshift({
        id: guid(),
        loanid,
        timestamp: created,
        amount: initialAmount
      });

      transactions.map(transaction => {
        t.none(`insert into transactions_${suffix} (id, loanid, timestamp, amount) values ('${transaction.id}', '${transaction.loanid}', ${transaction.timestamp}, ${transaction.amount});`);
      });
    });
    return t.batch(queries);
  })
    .catch(error => {
      console.log(error);
    });
};

// Create the tables that will be filled with data for a single app.
const initializeApp = (appID) => {
  const suffix = cleanString(appID);

  // Create empty tables for a new app.
  db.tx(t => {
    const queries = [
      t.none(`create table banks_${suffix} (id varchar(50) CONSTRAINT banks_pk_${suffix} PRIMARY KEY, name varchar(50) NOT NULL UNIQUE, enabled boolean);`),
      t.none(`create table customers_${suffix} (id uuid CONSTRAINT customers_pk_${suffix} PRIMARY KEY, name varchar(255), bankid varchar(50), psd2share boolean);`),
      t.none(`create table loans_${suffix} (id uuid CONSTRAINT loans_pk_${suffix} PRIMARY KEY, customerid uuid, created bigint, borrowed money);`),
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
