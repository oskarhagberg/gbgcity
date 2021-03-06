var qs = require('querystring')
  , util = require('util')
  , http = require('http')
  , urlParser = require('url')
  , emptyCallback = function() {console.log("Empty callback invoked. Are you missing a callback somewhere?")};
  
module.exports = function(options) {
  
  function httpGet(url, callback) {
    callback = callback || emptyCallback;

    var parsedUrl = urlParser.parse(url, true), request, result = "";

    if(parsedUrl.protocol == "https:" && !parsedUrl.port) {
      parsedUrl.port = 443;
    }

    if(parsedUrl.query === undefined) {
      parsedUrl.query = {};
    }
    
    var path = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query);
    console.log("Requesting: " + path);
    request = http.request({
      "host" : parsedUrl.hostname,
      "port" : parsedUrl.port,
      "path" : path,
      "method" : "GET",
      "headers" : {
        "Content-Length": 0
      }
    }, function(res) {
      res.on("data", function(chunk) {
        result += chunk;
      });
      res.on("end", function() {
        callback(null, res.statusCode, result);
      });
    });
    request.on("error", function(error) {
      console.log("Error calling remote host: " + error.message);
      callback(error);
    });

    request.end();
  }
  
  function parseResult(url, status, result, callback) {
    callback = callback || emptyCallback;
    
    if(status !== undefined && result !== undefined) {
      try {
        var json = JSON.parse(result);
        callback(null, json);
      } catch (e) {
        callback(e);
        return;
      }
    } else {
      callback(new Error("No response for " + url));
    }
  }
  
  function callApi(path, params, callback) {
    params = params || {};
    params.format = "json";
    var url = options.gbgcity.apiUrl + path + "/" + options.apiKey + "?" + qs.stringify(params);
    
    callUrl(url, callback);
  }
  
  // hack to work around the fact that some resources take the api key smack in the middle of the resource
  function callApiWithPathSegment(path, segment, params, callback) {
    params = params || {};
    params.format = "json";
    var url = options.gbgcity.apiUrl + path + "/" + options.apiKey + '/' + segment +  "?" + qs.stringify(params);
    
    callUrl(url, callback);
  }
  
  function callUrl(url, callback) {
    callback = callback || emptyCallback;
    
    httpGet(url, function(error, status, result) {
      if(error) {
        callback(error);
      } else {
        parseResult(url, status, result, callback);
      }
    });
  }
  
  return {
    "callApi" : callApi,
    "callApiWithPathSegment": callApiWithPathSegment
  }
  
}