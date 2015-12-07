'use strict';

$(function() {

  console.log ('index.html linked to script.js')

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
        // showAirport(airportData);
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


  var showAiport = function(airportData){
    console.log("here is the data passing from Ajax to showAiport");
    console.log(airportData);

    var result = $('#airport-profile').append('<div>').find('div');

    if (airportData.delay == "false"){
      var delay = "There are no delays.";
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
