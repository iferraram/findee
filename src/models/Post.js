const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  suggestions: String,
  post_type: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  event: {
    isEvent: Boolean,
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
  },
  cost: {
    start_price: Number,
    end_price: Number,
    currency: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  media: [
    {
      url: String,
      type: String,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

postSchema.plugin(timestamps);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
