const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
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
  cost_average: {
    start_price: Number,
    end_price: Number,
    currency: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  cover_photo: [
    {
      url: String,
      type: String,
    },
  ],
});

listSchema.plugin(timestamps);
const List = mongoose.model("List", listSchema);
module.exports = List;
