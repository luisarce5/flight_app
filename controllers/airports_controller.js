'use strict';
let express = require('express');
let router = express.Router();
// let User = require('../models/user');
let request = require('request');
let Airport = require('../models/airport.js');

router.route('/')
  .get((req, res, next) => {
    console.log('hit / route in /airports => /airports/');
    res.send('hit / route in /airports => /airports/');
  }); // ends get

// Sets router constructor
router.route('/search/:airportCode')
// SEARCHES for airpor by airport code
  .get((req, res, next) => {
    console.log ('hit /search/:airportCode');
    var airportCode = req.params.airportCode;
    res.send('hit /airport/:' + airportCode);
  });

module.exports = router;
