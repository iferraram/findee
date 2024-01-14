const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const eventSchema = new mongoose.Schema({
  capacity: Number,
  event_time: {
    date: Date,
    time: {
      isAllDay: Boolean,
      start: String,
      end: String,
      timezone: String,
    },
  },
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  rsvp: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["going", "interested", "not-going"],
      },
      attended: Boolean,
    },
  ],
});

eventSchema.plugin(timestamps);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
