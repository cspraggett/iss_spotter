const { nextISSTimesForMyLocation } = require("./iss");

// 66.207.199.230
// { latitude: '43.63830', longitude: '-79.43010' }

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked!", ip);
// });

// fetchCoordsByIP("66.207.199.230", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error.message);
//   } else {
//     console.log(data);
//   }
// });

// fetchISSFlyOverTimes(
//   { latitude: "43.63830", longitude: "-79.43010" },
//   (error, data) => {
//     if (error) {
//       console.log("It didn't work!", error.message);
//     } else {
//       console.log(data);
//     }
//   }
// );

const convertToDate = time => {
  return new Date(time * 1000).toUTCString();
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const key in Object.keys(passTimes)) {
    let message =
      `Next pass at ${convertToDate(passTimes[key]["risetime"])}` +
      `-0700 (Pacific Daylight Time) for ${passTimes[key]["duration"]} seconds!`;
    console.log(message);
  }
});
