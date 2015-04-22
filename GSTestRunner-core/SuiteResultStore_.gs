var SuiteResultStore_ = {
  
  save: function(suiteResult) {
    var suiteResultJSON = JSON.stringify(suiteResult);
    var key = getStoreKey_(suiteResult.name, suiteResult.namespace);
    Logger.log("STORING " + key);
    CacheService.getScriptCache().put(key, suiteResultJSON, 21600)
  },
  
  load: function(suiteName, namespace) {
    var key = getStoreKey_(suiteName, namespace);
    Logger.log(key);
    var suiteResultJSON = CacheService.getScriptCache().get(key);
    Logger.log(suiteResultJSON);
    if (suiteResultJSON != null) {
      return JSON.parse(suiteResultJSON);
    }
    return null;
  },
  
}

