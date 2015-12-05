'use strict';

$(function() {

  console.log ('index.html linked to script.js')

// ======= Event listener for Submit button to search for Airport & display Airport info
// =====================================================================================
  $('#JFK-button').click(function(event){
    event.preventDefault();
    console.log('Clicked JFK Button');

      $.ajax({
        url: 'http://services.faa.gov/airport/status/JFK?format=application/json'
      }).done(function(airportData){
        console.log('airport JFK selected');
        console.log('here is the data for JFK airport: ');
        console.log(airportData);
        // showAirport(airportData);
      }); // close Ajax

    }); // close #JFK-button


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
          // showAirport(airportData);
        }); // close Ajax

      }); // close #airport-button


}) // close main anomymous function
