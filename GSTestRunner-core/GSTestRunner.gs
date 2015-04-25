var TESTS_STARTS_WITH_ = "test";
var BEFORE_SUITE_FUNC_ = "beforeSuite_";
var BEFORE_TEST_FUNC_ = "beforeTest_";
var AFTER_TEST_FUNC_ = "afterTest_";
var AFTER_SUITE_FUNC_ = "afterSuite_";

var PUBLISH_RESULTS_BASE_URL_= "https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec";
var RESULT_BADGE_BASE_URL_ = "https://gs-tests-status.appspot.com/badge.svg";

/**
 * @fileoverview Contains the methods exposed by the library.
 */


/**
* Run a suite. A suite is any objects with test functions starting "test".
* 
* You can also implement special functions with names beforeSuite_, afterSuite_, beforeTest_ and afterTest_ to run 
*
* @param {Object} suite The suite to test.
* @param {string} suiteName The name of the suite. Used to find its results later. If you get a exception telling the suite is already taken, please change the suite name or namespace, or ask who taken the suite name to include you as recipient.
* @param {string} options The options object with any of following properties: namespace[string], notify[boolean], recipient[string], testCodeUrl[string], errorOnFail[boolean]
* 
*/
function runSuite(suite, suiteName, options) {
  if (suite == null) {
    throw "required param: suite";
  }
  if (suiteName == null) {
    throw "required param: suiteName";
  }
  if (options == null) {
    options = new Object();
  }
  
  options = ensureEffectiveUserAsRecipient_(options);
  
  AuthController_.checkAuthorization(suiteName, options);
  var suiteWrapper = new SuiteWrapper_(suite, suiteName, options.namespace);
  var suiteResult = suiteWrapper.run();
  if (options.testCodeUrl) {
    suiteResult.testCodeUrl = options.testCodeUrl;
  }
  if (suiteResult.total > 0) {
    SuiteResultStore_.save(suiteResult);
  }
  suiteWrapper.logResult();
  FailureNotifier_.notifyFailures(suiteResult, options);
  
  if (options.errorOnFail && suiteResult.failed > 0) {
    throw suiteResult.failed + "/" + suiteResult.total + " tests failed! Check logs."
  }
  
  return suiteResult;  
}

/**
* Run a test in a suite, given the test function name.
* 
* Running a standalone test does NOT store test results for later access.
*
* @param {Object} suite The suite to test.
* @param {string} testName The name of the test function.
* 
*/
function runTest(suite, testName) {
  
  if (suite[BEFORE_SUITE_FUNC_]) {
    suite[BEFORE_SUITE_FUNC_]();
  }  
  
  var testWrapper = new TestWrapper_(suite, testName);
  var testResult = testWrapper.run();
  
  if (suite[AFTER_SUITE_FUNC_]) {
    suite[AFTER_SUITE_FUNC_]();
  }
  
  Logger.log("\n\nTEST RESULT: \n\n" + testResult.name + " - " + testResult.message);
  
  if (!testResult.success) {
     throw "Test failed! " + testResult.message;
  }
  
  return testResult;
}

/**
* Get a suite result.
*
* @param {Object} suiteName The name of the suite
* @param {string} [namespace] Optional namespace
* 
*/
function getSuiteResult(suiteName, namespace) {
  Logger.log("Getting suite: " + namespace + "/" + suiteName )
  if (suiteName == null) {
    throw "required param: suiteName";
  }
  var suiteResult = SuiteResultStore_.load(suiteName, namespace);
  if (suiteResult == null) {
    var unknownSuite = new SuiteWrapper_(null, suiteName, namespace);
    suiteResult = unknownSuite.suiteResult;
    suiteResult.status = Status_.UNKNOWN;
    suiteResult.message = "---";
    suiteResult.lastRunMs = new Date(1900, 0, 1).getTime();
  }
  return suiteResult;
}


