// Returns a random timestamp picked between today and a given max and min number of days in the past.
const randomTimestamp = (max = 900, min = 400) => {
  const timestamp = Date.now();
  const today = new Date(timestamp);
  const randomDaysInPast = Math.ceil(Math.random() * (max - min) + min);

  return new Date(today).setDate(today.getDate() - randomDaysInPast);
};

module.exports = randomTimestamp;
