const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const ratingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  suggestions: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
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
});

ratingSchema.plugin(timestamps);
const Rating = mongoose.model("Post", ratingSchema);
module.exports = Rating;
