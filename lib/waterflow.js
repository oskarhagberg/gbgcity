module.exports = function(options) {
  
  var core = require('./core')(options);
  
  function formatDate(d) {
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    return year + "-" + month + "-" + date + "T" + hour + ":" + minute;
  }
  
  /**
   * Returns a list of all available measure stations producing water level data.
   * 
   * @memberof module:gbgcity/WaterFlow
   * @param {String|Number} latitude The latitude of the location around which to explore.
   * @param {String|Number} longitude The longitude of the location around which to explore.
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/WaterFlowService/help/operations/GetMeasureStations
   */
  function getMeasureStations(latitude, longitude, params, callback) {
    if(!latitude || !longitude) {
      callback(new Error("WaterFlow.getMeasureStations: latitude and longitude required"));
      return;
    }
    params = params || {};
    params.latitude = latitude;
    params.longitude = longitude;
    core.callApi('/waterflowservice/GetMeasureStations', params, callback);
  }
  
  /**
  * Returns a list of water level measuring points given a sertain station and time interval.
  *
  * @memberof module:gbgcity/WaterFlow
  * @param {String} stationId
  * @param {String} [startDate]
  * @param {String} [endData]
  * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
  * @see http://data.goteborg.se/WaterFlowService/help/operations/GetWaterLevel
  */
  function getWaterLevel(stationId, startDate, endDate, params, callback) {
    if(!stationId) {
      callback(new Error("WaterFlow.getWaterLevel: stationId required"));
      return;
    }
    params = params || {};
    params.stationid = stationId;
    if(!startDate && !endDate) {
      startDate = new Date();
      startDate.setHours(startDate.getHours() - 4);
      startDate = formatDate(startDate);
      endDate = new Date();
      endDate = formatDate(endDate);
    }
    params.startdate = startDate;
    params.endDate = endDate;
    core.callApi('/waterflowservice/GetWaterLevel', params, callback);
  }
  
  return {
    "getMeasureStations": getMeasureStations,
    "getWaterLevel": getWaterLevel
  }
}