const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  address: String,
  price: String,
  noOfBed: String,
  noOfBathTub: String,
  noOfToilet: String,
});

module.exports = mongoose.model("House", houseSchema);
