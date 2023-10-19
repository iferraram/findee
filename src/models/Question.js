const mongoose = require('mongoose');
const timestamps =require( 'mongoose-timestamp');

const questionsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});
questionsSchema.plugin(timestamps);
const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;