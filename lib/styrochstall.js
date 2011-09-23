module.exports = function(options) {
  
  var core = require('./core')(options);
  
  /**
   * This page describes the service operations at this endpoint.
   * 
   * @memberof module:gbgcity/StyrOchStall
   * @param {String|Number} latitude The latitude of the location around which to explore.
   * @param {String|Number} longitude The longitude of the location around which to explore.
   * @param {String|Number} radius The radius of the area to explore.
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/WaterFlowService/help/operations/GetMeasureStations
   */
  function getBikeStations(latitude, longitude, radius, params, callback) {
    if(!latitude || !longitude || !radius) {
      callback(new Error("StyrOchStall.getBikeStations: latitude, longitude, and radius required"));
      return;
    }
    params = params || {};
    params.latitude = latitude;
    params.longitude = longitude;
    //TODO: including radius cause server error
    //params.radius = radius;
    core.callApi('/StyrOchStall/v0.1/GetBikeStations', params, callback);
  };
  
  function getBikeStation(id, params, callback) {
    if(!id) {
      callback(new Error("StyrOchStall.getBikeStation: id is required"));
      return;
    }
    params = params || {};
    core.callApi('/StyrOchStall/v0.1/GetBikeStation/' + id, params, callback);
  };
  
  return {
    "getBikeStations": getBikeStations,
    "getBikeStation": getBikeStation
  }
}