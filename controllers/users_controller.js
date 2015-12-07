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

// gets & displays all of the information of all Users in the database
router.route('/')
  .get((req, res, next) => {
    console.log ('Hit / route in /users => /users/');
    User.find([], (err, user) => {
      if(err) throw err;
      res.send(user);
      console.log('These are all the Users in the database');
    });
  }); // ends .get

// gets & displays the information of a User given an ID in the database
router.route('/:id')
  .get((req, res, next) => {
    console.log("req.headers.host" + req.headers.host);
    User.find({_id: req.params.id}, (err, user) => {
      if (err) return next(err);
      res.send(user);
    }); // ends .find
  }) // ends .get for /:id


router.route('/authenticate')
  .post((req, res) => {
    console.log('hit/users/authenticate');
  });

router.route('/signup')
  .post ((req, res) => {
    let newUser = new User(req.body);
    console.log("Data for new User: " + req.body);
    newUser.save();
  }) // ends .post for /signup


module.exports = router;
