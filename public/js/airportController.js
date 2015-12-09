'use strict';
console.log('index.html file linked to airportController.js');

angular.module('FlightApp', [])
  .controller('AirportController', AirportController);

// angular.module('FlightApp', [])
//   .controller('AirportCodeInput', function($scope){
//     $scope.airportCode = airportCode;
//   });

AirportController.$inject = ['$http'];

function AirportController($http){
  let self = this;
  self.all = [];
  self.getAirport = getAirport;
  self.airport;
  self.airportCode;

  getAirport();

  function getAirport(){
    console.log("Here is airportCode inside getAirport");
    console.log(self.airportCode);
    $http
      // .get('http://services.faa.gov/airport/status/JFK?format=application/json')
      .get('http://services.faa.gov/airport/status/' + self.airportCode + '?format=application/json')
      .then(function(response){
        self.airport = response.data;
        console.log("Here is the response:");
        console.log(response.data);
      }); // close .then\

  } // close getAirportById

} // close AirportController
