const mongoose = require('mongoose');
const timestamps =require( 'mongoose-timestamp');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }]
});
commentSchema.plugin(timestamps);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;