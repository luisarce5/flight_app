'use strict';
console.log('index.html file linked to airportController.js');

angular.module('FlightApp', [])
  .controller('AirportController', AirportController);

AirportController.$inject = ['$http'];

function AirportController($http){
  let self = this;
  self.all = [];
  self.getAirport = getAirport;

  getAirport();

  function getAirport(){
    $http
      .get('http://services.faa.gov/airport/status/JFK?format=application/json')
      // .get('http://services.faa.gov/airport/status/' + airportCode + '?format=application/json')
      .then(function(response){
        self.all = response;
        console.log(response);
      }); // close .then\

  } // close getAirportById

} // close AirportController
