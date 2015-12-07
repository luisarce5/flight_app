'use strict';

let mongoose = require('mongoose');

let airportSchema = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  comments: []
});

let Airport = mongoose.model('myairports', airportSchema);

module.exports = Airport;
