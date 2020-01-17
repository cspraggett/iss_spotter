const request = require("request-promise-native");
const getLocation = `https://ipvigilante.com/json/`;

const getIp = `https://api.ipify.org?format=json`;

const fetchtMyIP = () => request(getIp);

const fetchCoordsByIP = IP => request(`${getLocation}${JSON.parse(IP).ip}`);

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchtMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
