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

