'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
// let airportSchema = require('./airport.js').schema;
//Define the rounds/iterations that bcrypt key setup phase uses
let SALT_WORK_FACTOR = 10;

let userSchema = new mongoose.Schema({
  username: String,
  created_at: Date,
  updated_at: Date,
  password: String,
  token: String,
  my_airports: [String]
});

// Before saving a password, encrypt it.
userSchema.pre('save', function(next) {
  let user = this;
  console.log(user);

  // hash the password only if it is new or has been modified
  if (!user.isModified('password')) return next();

  // generate a Salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next (err);

    // hash the password and hte newly generated Salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override cleartext password with hashed password
      user.password = hash;
      console.log(user.password);
      next();
    });
  });
});

// Use password verification
userSchema.methods.authenticate = function(password, callback) {
  // compare method that returns a boolean
  // Determine if the first argument once encrypted corresponds to the second argument
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let User = mongoose.model('user', userSchema);
module.exports = User;
