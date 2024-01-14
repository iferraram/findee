const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

categorySchema.plugin(timestamps);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
