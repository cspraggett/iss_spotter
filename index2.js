const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchtMyIP();
// fetchtMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const convertToDate = time => {
  return new Date(time * 1000).toUTCString();
};

const printPassTimes = passTimes => {
  for (const key of passTimes) {
    let message =
      `Next pass at ${convertToDate(key.risetime)}` +
      `-0700 (Pacific Daylight Time) for ${key.duration} seconds!`;
    console.log(message);
  }
};
nextISSTimesForMyLocation()
  .then(passTimes => printPassTimes(passTimes))
  .catch(err => console.log("It didn't work!", err.message));
