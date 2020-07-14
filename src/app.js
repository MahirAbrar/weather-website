const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

// INDEX PAGE

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Mahir",
  });
});

// ABOUT PAGE

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Mahir",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is a very helpful text!!",
    name: "Mahir",
  });
});

// WEATHER

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide a valid address" });
  }
  // res.send({
  //   forecast: "It is cloudy",
  //   location: "Dhaka",
  //   address: req.query.address,
  // });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          latitude,
          longitude,
          address: req.query.address,
        });
      });
    }
  );
});

// WEATHER
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term.",
    });
  }

  res.send({ products: [] });
});

//ERROR HANDLING
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help",
    name: "Mahir",
    errorMessage: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mahir",
    errorMessage: "Page not found",
  });
});
//ERROR HANDLING

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
