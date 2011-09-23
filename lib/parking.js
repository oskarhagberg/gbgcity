module.exports = function(options) {
  
  var core = require('./core')(options);
  
  /**
   * Returns all public parkings of the given type.
   * 
   * @memberof module:gbgcity/Parking
   * @param {String|Number} latitude The latitude of the location around which to explore.
   * @param {String|Number} longitude The longitude of the location around which to explore.
   * @param {String|Number} radius The radius of the area to explore.
   * @param {String} type The parking type. Any of: bus, handicap, mc, private, publicTime, publicToll, residential, truck
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/ParkingService/v1.0/help/operations/GetBusParkings and similar
   */
  function getParkings(latitude, longitude, radius, type, params, callback) {
    if(!latitude || !longitude || !radius) {
      callback(new Error("Parking.getParkings: latitude, longitude and radius required"));
      return;
    }
    params = params || {};
    params.latitude = latitude;
    params.longitude = longitude;
    params.radius = radius;
    var subResource;
    switch(type) {
      case 'bus': subResource = 'BusParkings';
        break;
      case 'handicap': subResource = 'HandicapParkings';
        break;
      case 'mc': subResource = 'MCParkings';
        break;
      case 'private': subResource = 'PrivateParkings';
        break;
      case 'publicTime': subResource = 'PublicTimeParkings';
        break;
      case 'publicToll': subResource = 'PublicTollParkings';
        break;
      case 'residential': subResource = 'ResidentialParkings';
        break;
      case 'truck': subResource = 'TruckParkings';
        break;
      default:
        callback(new Error("Parking.getParkings: unknown type: " + type));
    }
    core.callApi('/ParkingService/v1.0/' + subResource, params, callback);
  }
  
  /**
   * Returns all public pay machines.
   * 
   * @memberof module:gbgcity/Parking
   * @param {String|Number} latitude The latitude of the location around which to explore.
   * @param {String|Number} longitude The longitude of the location around which to explore.
   * @param {String|Number} radius The radius of the area to explore.
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/ParkingService/v1.0/help/operations/GetPublicPaymachines
   */
  function getPublicPayMachines(latitude, longitude, radius, params, callback) {
    if(!latitude || !longitude || !radius) {
      callback(new Error("Parking.getPublicPayMachines: latitude, longitude and radius required"));
      return;
    }
    params = params || {};
    params.latitude = latitude;
    params.longitude = longitude;
    params.radius = radius;
    core.callApi('/ParkingService/v1.0/PublicPayMachines', params, callback);
  }
  
  /**
   * Returns all registered parkingowners in database.
   * 
   * @memberof module:gbgcity/Parking
   * @param {Object} [params] An object containing additional parameters.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results)/
   * @see http://data.goteborg.se/ParkingService/v1.0/help/operations/GetParkingOwners
   */  
  function getParkingOwners(params, callback) {
    params = params || {};
    core.callApi('/ParkingService/v1.0/ParkingOwners', params, callback);
  }
  
  return {
      "getParkings": getParkings
    , "getPublicPayMachines": getPublicPayMachines
    , "getParkingOwners": getParkingOwners
  }
  
}