const request = require("request");

const ip = "https://api.ipify.org/?format=json";
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = callback => {
  request(ip, (error, respons, body) => {
    if (error) {
      callback(error);
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

// request(ip, (error, response, body) => {
//   console.log("in fetchMyIP");
//   console.log(body);
// });
module.exports = { fetchMyIP };
//request();
