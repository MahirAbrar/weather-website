const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFoaXJhYnJhcnIiLCJhIjoiY2tjNGpocmptMDZ4czJ4bnY2MjMyZDZvNyJ9.q7l-n9Qr7oPOKqoVhcWYAA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      callback(null, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// geoCode("banani", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = geoCode;
