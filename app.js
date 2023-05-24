const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AdsRoute = require("./api/routes/adsRoute");
const CompaniesRoute = require("./api/routes/companiesRoute");

mongoose.connect(
  "mongodb+srv://saurav9877:pIRD3A4nS448hOru@acviss.yhielr4.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("Connection Faild");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Database Connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use("/ads", AdsRoute);
app.use("/companies", CompaniesRoute);

// incase any error ocuur
app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});

module.exports = app;
