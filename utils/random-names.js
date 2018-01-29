const firstNames = require('./first-names.json');
const lastNames = require('./last-names.json');
const randomIndex = require('./random-index');

// Return a given number of random combinations of names.
const randomNames = (total) => new Array(total).fill('')
  .map(name => {
    const firstName = firstNames[randomIndex(firstNames.length)];
    const lastName = lastNames[randomIndex(lastNames.length)];

    return `${firstName} ${lastName}`;
  });

module.exports = randomNames;
