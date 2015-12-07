'use strict'
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secret = process.env.SECRET;
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// require models
let User = require('../models/user.js');
let Airport = require('../models/airport.js');

let express = require('express');
let router = express.Router();

var userToken;

router.route('/')
  .get((req, res, next) => {
    console.log ('Hit / route in /users => /users/');
    User.find([], (err, user) => {
      if(err) throw err;
      res.send(user);
      console.log('These are all the Users in the database');
    });
  }); // ends .get

router.route('/authenticate')
  .post((req, res) => {
    console.log('hit/users/authenticate');
  });

module.exports = router;
