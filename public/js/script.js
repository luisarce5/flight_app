'use strict';

$(function() {

  console.log ('index.html linked to script.js');

  // ===== Event listener for Submit JFK button to search for JFK Airport & display Airport info
  // =====================================================================================
  $('#JFK-button').click(function(event){
    event.preventDefault();
    console.log('Clicked JFK Button');

    // Test Case: Retrieve information for JFK Airport from API & display in console
      $.ajax({
        url: 'http://services.faa.gov/airport/status/JFK?format=application/json'
      }).done(function(airportData){
        console.log('airport JFK selected');
        console.log('here is the data for JFK airport: ');
        console.log(airportData);
        // showAirport(airportData);
      }); // close Ajax

    }); // close #JFK-button

  // ===== Event listener for Submit Code button to search for any Airport by Airport Code & display Airport info
  // =====================================================================================
  $('#airport-button').click(function(event){
    event.preventDefault();
    console.log('Clicked Airport Button');

    var airportCode = $('#airport-input').val();
    console.log('Airport Code: ' + airportCode);

      $.ajax({
        url: 'http://services.faa.gov/airport/status/' + airportCode + '?format=application/json'
      }).done(function(airportData){
        console.log('here is the data for the airport selected: ');
        console.log(airportData);
        $('#airport-profile').empty();
        showAiport(airportData);
      }); // close Ajax

    }); // close #airport-button

      // ===== When the page loads, hide the Login Form
      // We only want the Login Form to appear if a User clicks the "Log in" Button.
      // =====================================================================================

  // When the page loads & before the User clicks Login, hide the login form
  // The form will only appear after the User has clicked Login
  $('#login-form').hide();
  $('#login-failed').hide();
  $('#signup-success').hide();
  $('#signup-form').hide();
  $('#signup success').hide();
  $('#logout-link').hide();

  // Event Lister to Let User Sign Up => Display signup form
  $('#signup-link').click((event) => {
    event.preventDefault();
    console.log("Sign Up clicked");
    $('#signup-form').show();
    $('#airport-profile').empty();
  })

  // Event Listener to Save Sign Up information when Submit button is clicked in the SignUp Form
  $('#submit-signup').click((event) => {
    event.preventDefault();
    console.log('just clicked Submit button for Sign Up Form');
    $('#signup-form').hide();
    console.log('just hid signup form');
    $('#signup-success').show();
    console.log('just showed signup suceess');
    $('#login-form').show();
    console.log('just showed login form');

    // pass info thru Ajax to create a New User in the database
    let user = {};
    user.username = $('#signup-username').val();
    user.password = $('#signup-password').val();
      $.ajax({
        url: '/users/signup',
        method: 'POST',
        data: user
      }) // close ajax for signup
  }) // close submit-signup clicke event

  // Event Listener to let User Log In => Display Log In Form
  $('#login-link').click((event) => {
    event.preventDefault();
    console.log('Log In Link clicked');
    $('#signup-form').hide();
    $('#login-form').show();

    $('#user-profile').empty();
    $('#airport-profile').empty();
  }) // close Event Listener for login link

  $('#logout-link').click((event) => {
    event.preventDefault();
    $.get({
      url: '/'
    })
  }) // close Event Listener for logout link

  // Event Listener for Log In Submit button
  $('#submit-login').click((event) => {
    event.preventDefault();
    console.log('clicked Log In Submit button');

    let user = {};
    user.username = $('#username-input').val();
    user.password = $('#password-input').val();

    $.ajax({
      url: '/users/authenticate',
      method: "POST",
      data: user
    }) // closes .ajax for POST method
    .done(function(data){
      // console.log('user_object:' + data.user);
      // data here references the object containing a token or error message
      console.log(data);
      if (data.token) {
        $('#signup-success').hide();
        console.log('token: ' + data.token);
        // placing the data.token into the User object
        data.user.token = data.token;
        console.log('user_token: ' + data.user.token);
        $('#login-form').hide();
        $('#login-link').hide();
        $('#signup-link').hide();
        $('#logout-link').show(); /// ###### PENDING

        // create & append a customized welcome message to the user-actions div
        let welcomeUser = document.createElement('div');
        welcomeUser.id = "welcome-user";
        // user.username is something we sent in the POST request, so it's still accesible with this syntax
        welcomeUser.innerHTML = '<p> Hi, ' + user.username + ' is currently logged in </p>';
        console.log('user_id: ' + data.user._id);
        $('#user-welcome').append(welcomeUser);

        // if user is not granted token, show a "not found" message
      } else {
          $('#login-failed').show();
      }
    })
  }); // ends login-submit button click event


  var showAiport = function(airportData){
    console.log("here is the data passing from Ajax to showAiport");
    console.log(airportData);

    var result = $('#airport-profile').append('<div>').find('div');

    if (airportData.delay == "false") {
      var delay = "There are no delays.";
    } else {
      delay = "There are delays.";
        console.log(delay);
    };

    result.append('<p><strong> Airport Code: </strong> ' + airportData.IATA + '</p>');
    result.append('<p><strong> City: </strong> ' + airportData.city + '</p>');
    result.append('<p><strong> Airport Name: </strong>' + airportData.name + '</p>');
    result.append('<p><strong> Delay: </strong> '+ delay + '</p>');
    result.append('<p><strong> Delay Reason: </strong>' + airportData.status.reason + '</p>');
    result.append('<p><strong> Temp: </strong>' + airportData.weather.temp + '</p>');
    result.append('<p><strong> Visibility (miles): </strong>' + airportData.weather.visibility + '</p>');
    result.append('<p><strong> Weather Conditions: </strong>' + airportData.weather.weather + '</p>');
    result.append('<p><strong> Wind: </strong>' + airportData.weather.wind + '</p>');

  }; // close showAirport



}) // close main anomymous function
