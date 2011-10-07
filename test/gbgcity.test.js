var assert = require('assert')
  , options = require('./options')
  , gbgcity = require('./../lib/gbgcity')(options);
  
function reportError(test, message) {
  console.log(test + " :  \033[22;31mERROR: " + message + "\x1B[0m");
}

function ok(test) {
  console.log(test + " : \033[22;32mOK\x1B[0m");
}

function TestSuite() {

  var Tests = {
    "WaterFlow" : {},
    "Parking" : {},
    "StyrOchStall": {},
    "TravelTime": {}
  };

  Tests.WaterFlow.getMeasureStations = function() {
    var test = "gbgcity.WaterFlow.getMeasureStations(latitude=57.710383, longitude=11.945057)";
    gbgcity.WaterFlow.getMeasureStations(57.710383, 11.945057, null, function(error, result) {
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.equal(result[0].Id, "Gotaalvbron.iFix.Analog.VattenNiva");
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.WaterFlow.getWaterLevel = function() {
    var test = "gbgcity.WaterFlow.getWaterLevel(stationId=Gotaalvbron.iFix.Analog.VattenNiva)";
    gbgcity.WaterFlow.getWaterLevel('Gotaalvbron.iFix.Analog.VattenNiva', '2011-09-23T14:11', '2011-09-23T14:20', null, function(error, result) {
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.equal(result.StationId, 'Gotaalvbron.iFix.Analog.VattenNiva');
          assert.equal(result.Values[0].Level, 1042);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.Parking.getParkings = function() {
    var test = "gbgcity.Parking.getParkings(latitude=57.714348, longitude=11.933275, radius=100, type=bus)";
    gbgcity.Parking.getParkings(57.714348, 11.933275, 100, 'bus', null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.equal(result[0].Id, '1480 2008-03758');
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.Parking.getPublicPayMachines = function() {
    var test = "gbgcity.Parking.getPublicPayMachines(latitude=57.720084, longitude=11.944586, radius=100)";
    gbgcity.Parking.getPublicPayMachines(57.720084, 11.944586, 100, null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.equal(result[0].Id, '1227');
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.Parking.getParkingOwners = function() {
    var test = "gbgcity.Parking.getParkingOwners()";
    gbgcity.Parking.getParkingOwners(null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.ok(result.length > 0);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.StyrOchStall.getBikeStations = function() {
    var test = "gbgcity.StyrOchStall.getBikeStations(latitude=57.720084, longitude=11.944586, radius=100)";
    gbgcity.StyrOchStall.getBikeStations(57.720084, 11.944586, 100, null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.ok(result.Stations.length > 0);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.StyrOchStall.getBikeStation = function() {
    var test = "gbgcity.StyrOchStall.getBikeStation(id=1)";
    gbgcity.StyrOchStall.getBikeStation(1, null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try {
          assert.ok(result);
          assert.equal(result.Stations[0].Label, 'LILLA BOMMEN');
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.TravelTime.getRoutes = function() {
    var test = "gbgcity.TravelTime.getRoutes()";
    gbgcity.TravelTime.getRoutes(null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try{  
          assert.ok(result);
          assert.ok(result.length > 0);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.TravelTime.getRoute = function() {
    var test = "gbgcity.TravelTime.getRoute(id=20104)";
    gbgcity.TravelTime.getRoute(20104, null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try{  
          assert.ok(result);
          assert.equal(result.Length, 6239);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.TravelTime.getLatestTravelTimes = function() {
    var test = "gbgcity.TravelTime.getLatestTravelTimes()";
    gbgcity.TravelTime.getLatestTravelTimes(null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try{
          assert.ok(result);
          assert.ok(result.length > 0);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  Tests.TravelTime.getLatestTravelTime = function() {
    var test = "gbgcity.TravelTime.getLatestTravelTime(id=20104)";
    gbgcity.TravelTime.getLatestTravelTime(20104, null, function(error, result){
      if(error) {
        reportError(test, error.message);
      } else {
        try{  
          assert.ok(result);
          assert.equal(result.RouteID, 20104);
          ok(test);
        } catch (e) {
          reportError(test, e);
        }
      }
    });
  };
  
  return {
    "Tests" : Tests,
    "execute" : function(testGroup, testName) {
      for(var group in Tests) {
        if(!testGroup || (testGroup && testGroup == group)) {
          for(var test in Tests[group]) {
            if(!testName ||(testName && testName == test)) {
              var t = Tests[group][test];
              if(t && typeof(t) == "function") {
                console.log("Running: " + test);
                t.call(this);
              }
            }
          }
        }
      }
    }
  }
  
}


TestSuite().execute();