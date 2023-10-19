const mongoose = require('mongoose');
const timestamps =require( 'mongoose-timestamp');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place', 
  },
  dateTime:{
    date: Date,
    time: {
      isAllDay:Boolean,
      start: String, 
      end: String,
      timezone: String,
    },
  },
  would_recommend: {
    type: Boolean,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  organizer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  price:{
    start_price:Number,
    end_price: Number,   
    currency: String,   
  },
  rsvp: [
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      }, 
      status:{
        type:String,
        enum:[ 'going', 'interested', 'not-going']
      },
      attended: Boolean,
    },
  ],
  category: String,
  mood: String,
  popularity: Number,
  rating: Number,
  grouping_preference: String,
  activity_objective: String,
  atmosphere: String,
  media: [
    {
      url: String,  
      type: String, 
    },
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', 
      required: false,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
      required: false,
    },
  ],
  capacity:Number,
});


eventSchema.plugin(timestamps);
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
