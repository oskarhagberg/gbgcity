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
   * Returns a latest measurement
   * 
   * @memberof module:gbgcity/AirQuality
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/AirQualityService/v1.0/help/operations/GetLatestMeasurements
   */
  function getLatestMeasurement(params, callback) {
    params = params || {};
    core.callApi('/AirQualityService/v1.0/LatestMeasurement', params, callback);
  }
  
  /**
   * Returns a list of measurements
   * 
   * @memberof module:gbgcity/AirQuality
   * @param {Date} startDate From when to get measurements
   * @param {Date} endDate To when to get measurements
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/AirQualityService/v1.0/help/operations/GetLatestMeasurements
   */
  function getMeasurements(startDate, endDate, params, callback) {
    params = params || {};
    if(!startDate && !endDate) {
      startDate = new Date();
      startDate.setHours(startDate.getHours() - 24);
      startDate = formatDate(startDate);
      endDate = new Date();
      endDate = formatDate(endDate);
    }
    params.startdate = startDate;
    params.endDate = endDate;
    core.callApi('/AirQualityService/v1.0/Measurements', params, callback);
  }
  
  return {
    "getLatestMeasurement": getLatestMeasurement,
    "getMeasurements": getMeasurements
  }
}