'use strict';
let express = require('express');
let logger = require('morgan');
let request = require('request');
let path = require('path');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let User = require('./models/user'); // get our mongoose model for user



// require our routes
let userRoutes = require('./controllers/users_controller');
let airportRoutes = require('./controllers/airports_controller');

let app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

let mongoose = require('mongoose');
// connect to our database, flightapp name of database

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/flightapp');
                  // note that 'airport_app' name must match the local database name

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', (callback) => {
  console.log('Mongoose Connected');
});

// Register the required routes
// all routes starting with /users will be in the userRoutes
app.use('/users', userRoutes);
// all routes starting with /airports will be in the airportRoutes
app.use('/airports', airportRoutes);


// if using Heroku then will use process.env.PORT; otherwise local port 8000
let server = app.listen(process.env.PORT || 8000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
  console.log(process.env.SECRET);
});
