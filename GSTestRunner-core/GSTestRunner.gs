var TESTS_STARTS_WITH_ = "test";
var BEFORE_ALL_TESTS_FUNC_ = "beforeAllTests_";
var BEFORE_EACH_TEST_FUNC_ = "beforeEachTest_";
var AFTER_EACH_TEST_FUNC_ = "afterEachTest_";
var AFTER_ALL_TESTS_FUNC_ = "afterAllTests_";

var PUBLISH_RESULTS_BASE_URL_= "https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec";
var RESULT_BADGE_BASE_URL_ = "https://gs-tests-status.appspot.com/badge.svg";

function runSuite(suite, name, options) {
  if (options == null) {
    options = new Object();
  }
  
  AuthController_.checkAuthorization(Session.getActiveUser(), name, options.namespace);
  
  var suiteWrapper = new SuiteWrapper_(suite, name, options.namespace);
  var suiteResult = suiteWrapper.run();
  
  if (options.testCodeUrl) {
    suiteResult.testCodeUrl = options.testCodeUrl;
  }
  
  if (suiteResult.total > 0) {
    SuiteResultStore_.save(suiteResult);
  }
  
  suiteWrapper.logResult();
  
  FailureNotifier_.notifyFailures(suiteResult, options);
  
  return suiteResult;  
}

function clear() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  CacheService.getScriptCache().remove("BkperApp_bkper")
}

function getSuiteResult(name, namespace) {
  
  var suiteResult = SuiteResultStore_.load(name, namespace);
  
  if (suiteResult == null) {
    var unknownSuite = new SuiteWrapper_(null, name, namespace);
    suiteResult = unknownSuite.suiteResult;
    suiteResult.status = Status_.UNKNOWN;
    suiteResult.message = "---";
    suiteResult.lastRunMs = new Date(1900, 0, 1).getTime();
  }
  
  return suiteResult;
  
}


