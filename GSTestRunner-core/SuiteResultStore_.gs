var SuiteResultStore_ = {
  
  save: function(suiteResult) {
    var suiteResultJSON = JSON.stringify(suiteResult);
    var key = getStoreKey_(suiteResult.suiteName, suiteResult.namespace, "result_");
    storeProperty_(key, suiteResultJSON);
  },
  
  load: function(suiteName, namespace) {
    var key = getStoreKey_(suiteName, namespace, "result_");
    var suiteResultJSON = readProperty_(key);
    if (suiteResultJSON != null) {
      return JSON.parse(suiteResultJSON);
    }
    return null;
  },
  
}

//Retrieving results
function logSuiteResult() {
  var suiteResult = getSuiteResult("Get Started", "bkper");
  Logger.log("status: " + suiteResult.status);
  Logger.log("total: " + suiteResult.total);
  Logger.log("failed: " + suiteResult.failed);
  Logger.log("passed: " + suiteResult.passed);
  
  Logger.log("URL: " + suiteResult.url);
  
}
