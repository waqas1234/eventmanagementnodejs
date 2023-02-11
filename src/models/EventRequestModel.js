const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema //

const EventRequestSchema = new Schema({
  eventid: {
    type: String,
    required: true,
  },

  userid: {
    type: String,
    required: true,
  },

  companyid: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EventRequest = mongoose.model(
  "eventrequests",
  EventRequestSchema
);
