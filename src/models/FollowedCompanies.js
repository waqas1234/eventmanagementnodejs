const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema //

const FollowedCompaniesSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  companyid: {
    type: String,
    required: true,
  },
});

module.exports = FollowedCompanies = mongoose.model(
  "followedcompanies",
  FollowedCompaniesSchema
);
