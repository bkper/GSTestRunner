var TESTS_STARTS_WITH_ = "test";

var BEFORE_ALL_TESTS_FUNC_ = "beforeAllTests_";

var BEFORE_EACH_TEST_FUNC_ = "beforeEachTest_";

var AFTER_EACH_TEST_FUNC_ = "afterEachTest_";

var AFTER_ALL_TESTS_FUNC_ = "afterAllTests_";


function runSuite(script, organization, project) {
  
  var suite = new Suite_(script, organization, project)
  
  var result = suite.run();
  
  ResultStore_.save(result);

  return result;  
  
}


