const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema //

const CompanySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Company = mongoose.model("companies", CompanySchema);
