const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: String,
  element: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "elementType",
    required: true,
  },
  elementType: {
    type: String,
    enum: ["Post", "Place"],
    required: true,
  },
  cover_photo: [
    {
      url: String,
      type: String,
    },
  ],
});

scheduleSchema.plugin(timestamps);
const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
