const request = require("request");

const getLocation = `https://ipvigilante.com/json/`;
const getIp = `https://api.ipify.org?format=json`;
/**
 * Makes a single API request to retrieve the user's getIp address.
 * Input:
 *   - A callback (to pass back an error or the getIp string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The getIp address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIp = callback => {
  request(getIp, (error, response, body) => {
    if (error) {
      console.log("error code");
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching getIp. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`${getLocation}${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};
const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching flyover times. Response ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body).response;
      callback(null, data);
    }
  );
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIp((error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(data, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(data, callback);
    });
  });
};

module.exports = { nextISSTimesForMyLocation };

// request(`${getLocation}66.207.199.230`, (error, response, body) => {
//   const [latitude, longitude] = [
//     JSON.parse(body).data.latitude,
//     JSON.parse(body).data.longitude
//   ];
//   console.log(`lat: ${latitude}, lng: ${longitude}`);
// });
