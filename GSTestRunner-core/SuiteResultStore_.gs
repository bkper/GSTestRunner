var DEFAULT_ORGANIZATION = "_____undefined____";

var SuiteResultStore_ = {
  
  save: function(suiteResult) {
    var suiteResultJSON = JSON.stringify(suiteResult);
    var key = getStoreKey_(suiteResult.name, suiteResult.organization);
    CacheService.getScriptCache().put(key, suiteResultJSON, 21600)
  },
  
  load: function(suiteName, organization) {
    var key = getStoreKey_(suiteName, organization);
    var suiteResultJSON = CacheService.getScriptCache().get(key);
    if (suiteResultJSON != null) {
      return JSON.parse(suiteResultJSON);
    }
    return null;
  },
  
}

function getStoreKey_(suiteName, organization) {
  if (organization == null) {
    organization = DEFAULT_ORGANIZATION;
  }
  return suiteName + "_" + organization;
}