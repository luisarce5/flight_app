'use strict';

$(function() {

  console.log ('index.html linked to script.js')

// ======= Event listener for Submit button to search for Airport & display Airport info
// =====================================================================================
  $('#submit-button').click(function(event){
    event.preventDefault();
    console.log('Clicked Submit Button');

      $.ajax({
        url: 'http://services.faa.gov/airport/status/JFK?format=application/json'
      }).done(function(airportData){
        console.log('airport JFK selected');
        console.log('here is the data for the airport selected: ');
        console.log(airportData);
        // showAirport(airportData);
      }); // close Ajax

    }); // close #Submit-button
}) // close main anomymous function
