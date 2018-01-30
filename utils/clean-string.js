const cleanString = (input) => input.trim().replace(/\W+/g, '').toLowerCase();

module.exports = cleanString;
