const request = require("postman-request");

const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3c1c947a98c81bffa18ffadb57901961&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Please enter a valid coordinate.", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees outside.`
      );
    }
  });
};

module.exports = foreCast;

// `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees outside.`
