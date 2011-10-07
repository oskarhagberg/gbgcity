module.exports = function(options) {
  
  var core = require('./core')(options);
  
  /**
   * Returns a list of all available routes that has travel time estimates
   * 
   * @memberof module:gbgcity/TravelTime
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/TravelTimesService/v1.0/help/operations/GetRoutes
   */
  function getRoutes(params, callback) {
    params = params || {};
    core.callApi('/TravelTimesService/v1.0/Routes', params, callback);
  }

  /**
   * Returns a route
   * 
   * @memberof module:gbgcity/TravelTime
   * @param {String} id The id of the route
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/TravelTimesService/v1.0/help/operations/GetRoute
   */
  function getRoute(id, params, callback) {
    params = params || {};
    core.callApiWithPathSegment('/TravelTimesService/v1.0/Routes', id, params, callback);
  }
  
  /**
   * Returns a list of latest travel time estimates
   * 
   * @memberof module:gbgcity/TravelTime
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/TravelTimesService/v1.0/help/operations/GetLatestTravelTimes
   */
  function getLatestTravelTimes(params, callback) {
    params = params || {};
    core.callApi('/TravelTimesService/v1.0/LatestTravelTimes', params, callback);
  }
  
  /**
   * Returns latest travel time estimate of route
   * 
   * @memberof module:gbgcity/TravelTime
   * @param {String} id The id of the route
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/TravelTimesService/v1.0/help/operations/GetLatestTravelTimes
   */
  function getLatestTravelTime(id, params, callback) {
    params = params || {};
    core.callApiWithPathSegment('/TravelTimesService/v1.0/LatestTravelTimes', id, params, callback);
  }
  
  return {
    "getRoutes": getRoutes,
    "getRoute": getRoute,
    "getLatestTravelTimes": getLatestTravelTimes,
    "getLatestTravelTime": getLatestTravelTime
  }
}