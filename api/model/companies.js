const mongoose = require("mongoose");

const companies = new mongoose.Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model("Companies", companies);
