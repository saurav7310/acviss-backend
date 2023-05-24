const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ads = new mongoose.Schema({
  companyId: {
    type: ObjectId,
  },
  primaryText: String,
  headline: String,
  description: String,
});

module.exports = mongoose.model("Ads", ads);
