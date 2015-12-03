'use strict';
let express = require('express');
let logger = require('morgan');
let request = require('request');
let path = require('path');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let User = require('./models/user'); // get our mongoose model for user

let app = express();   // TEMP
app.use(express.static('./public')); // TEMP

// require our routes
// let userRoutes = require('./controllers/users_controller');
// let flightRoutes = require('./controllers/flights_controller');

// temporaty testing routes
app.get('/test', function(req,res){
  console.log('hit /test route');
})
////////////

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// let mongoose = require('mongoose');
// connect to our database

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/flight_app');

// let db = mongoose.connection;
// db.on('error'), console.error.bind(console, 'Connection error:'));
// db.once('open', (callback) => {
//   console.log('Mongoose Connected');
// });

// Register the required routes
// all routes starting with /users will be in the userRoutes
// app.use('/users', userRoutes);
// all routes starting with /flights will be in the flightRoutes
// app.use('/flights', fligtRoutes)
// if using Heroku then will use process.env.PORT; otherwise local port 3000
let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
  console.log(process.env.SECRET);
});
