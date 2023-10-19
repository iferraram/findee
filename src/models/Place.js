const mongoose = require('mongoose');
const timestamps =require( 'mongoose-timestamp');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
    latitude: {
      type: Number,
      required: true,
    },
  longitude: {
      type: Number,
      required: true,
    },
  owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  social_media:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SocialMedia', 
    }],
  google_id: {
      type: String,
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
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    complete_address:String
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
  }],
  events:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event', 
  }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
      required: false,
    },
  ],
});

placeSchema.index({ location: '2dsphere' });
placeSchema.plugin(timestamps);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;