const mongoose = require("mongoose");

const { Schema } = mongoose;

const companySchema = Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: String, required: true },
  market_cap: { type: String, required: true },
  currency: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
