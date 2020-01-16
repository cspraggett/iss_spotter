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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});
