const bcrypt = require('bcryptjs');
const  { Schema } =require( 'mongoose');
const timestamps =require( 'mongoose-timestamp');
const mongoose = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
});

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

UserSchema.methods.comparePassword = (password)=> {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10; // You can adjust the number of rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
