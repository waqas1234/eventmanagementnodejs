const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema //

const EventSchema = new Schema({
  companyid: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

module.exports = Event = mongoose.model("events", EventSchema);
