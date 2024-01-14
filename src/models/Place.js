const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  google_id: {
    type: String,
  },
  plus_code: {
    compound_code: String,
    global_code: String,
  },
  google_rating: {
    type: String,
  },
  media: [
    {
      url: String,
      type: String,
    },
  ],
  address: {
    formatted_address: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    complete_address: String,
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
});

placeSchema.index({ location: "2dsphere" });
placeSchema.plugin(timestamps);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
