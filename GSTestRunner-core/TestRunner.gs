var TESTS_STARTS_WITH_ = "test";
var BEFORE_ALL_TESTS_FUNC_ = "beforeAllTests_";
var BEFORE_EACH_TEST_FUNC_ = "beforeEachTest_";
var AFTER_EACH_TEST_FUNC_ = "afterEachTest_";
var AFTER_ALL_TESTS_FUNC_ = "afterAllTests_";

var DEFAULT_ORGANIZATION_ = "projects";


function runSuite(suite, project, options) {
  if (options == null) {
    options = new Object();
  }
  
  if (options.organization == null) {
    options.organization = DEFAULT_ORGANIZATION_;
  }
  
  var suiteWrapper = new SuiteWrapper_(suite, options.organization, project);
  var suiteResult = suiteWrapper.run();
  
  if (suiteResult.total > 0) {
    SuiteResultStore_.save(suiteResult);
  }
  
  suiteWrapper.logResult();
  
  return suiteResult;  
}

function clear() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}

function getSuiteResult(project, organization) {
  
  if (organization == null) {
    organization = DEFAULT_ORGANIZATION_;
  }
  
  var suiteResult = SuiteResultStore_.load(organization, project);
  
  if (suiteResult == null) {
    suiteResult = {
      project: project,
      organization: organization,
      status: Status_.UNKNOWN,
      total: 0,
      totalSuccess: 0,
      totalFail: 0,
      testsResults: new Array(),
      message: "???",
      lastRunMs: new Date(1970, 0, 1).getTime(),
    }
  }
  
  return suiteResult;
  
}


