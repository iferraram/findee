const bcrypt = require('bcryptjs');
const  { Schema } =require( 'mongoose');
const timestamps =require( 'mongoose-timestamp');
const mongoose = require('mongoose');
import {
  compare,
} from 'bcryptjs';

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  username:[{
  type: String,
  index: { unique: true }
  }],
  phone: String,
  rating: Number,
  timezone:String,
  profileMedia:[
    {
      url: String,  
      type: String, 
    },
  ],
  social_media:[{
    name: String,
    username: String,
  }],
  profileDescription:String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', 
  }],
  events:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
  }],
  calendar:[
    {
      event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
    },
    status:{
      type:String,
      enum:[ 'going', 'interested', 'not-going']
    },
    attended: Boolean,
  }],
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place', 
  }],
  lists_events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
  }],
  lists_places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Places', 
  }],
  recommendations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'recommendedModel',
    },
  ],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  }],
  posts_likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'recommendedModel',
    },
  ],
  recommendedModel: {
    type: String,
    enum: ['Place', 'Event'],
  },
  profile_likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  }],
});

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

UserSchema.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});


UserSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
