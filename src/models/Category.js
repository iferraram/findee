const mongoose = require('mongoose');
const timestamps =require( 'mongoose-timestamp');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
    }
  });
  
  categorySchema.plugin(timestamps);

  const Category = mongoose.model('Category', categorySchema);
module.exports = Category;


