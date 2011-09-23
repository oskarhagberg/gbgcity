var assert = require('assert')
  , options = require('./options')
  , gbgcity = require('./../lib/gbgcity')(options);
  
gbgcity.WaterFlow.getMeasureStations(57.710383, 11.945057, null, function(error, result){
  if(error){
    console.log(error);
  } else {
    console.log(result);
    console.log('--------');
    var id = result[0].Id;
    gbgcity.WaterFlow.getWaterLevel(id, null, null, null, function(error, result){
      if(error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }
});