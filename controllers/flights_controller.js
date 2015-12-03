'use strict';
let express = require('express');
let router = express.Router();
// let User = require('../models/user');
let request = require('request');
let Flight = require('../models/flight.js');

router.route('/')
  .get((req, res, next) => {
    console.log('hit / route in /flights => /flights/');
    res.send('hit / ');
  }); // ends get

// Sets router constructor
router.route('/airport/:airportCode')
// SEARCHES for airpor by airport code
  .get((req, res, next) => {
    console.log ('hit /flights/airport/:airportCode');
    res.send('hit /airport/:airportCode');
  });

module.exports = router;
