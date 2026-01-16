const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Converted"],
  },
  source: {
    type: String,
    enum: ["Website", "Referral", "Ads"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", leadSchema);
