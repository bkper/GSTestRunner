function SuiteWrapper_(suite, name, namespace) {
  
  this.suite_ = suite;
  this.namespace_ = namespace;
  this.name_ = name;
  
  this.suiteResult =  {
    name: this.name_,
    namespace: this.namespace_,
    status: Status_.PASSING,
    total: 0,
    passed: 0,
    failed: 0,
    testsResults: new Array(),
    message: "",
    lastRunMs: Date.now(),
    url: getResultURL_(this.name_, this.namespace_),
    badgeUrl: getBadgeURL_(this.name_, this.namespace_),
  };  
  
  SuiteWrapper_.prototype.run = function() {
    try {
      
      if (this.suite_[BEFORE_ALL_TESTS_FUNC_]) {
        this.suite_[BEFORE_ALL_TESTS_FUNC_]();
      }  
      
      for (var propName in this.suite_) {
        if (propName.substring(0, TESTS_STARTS_WITH_.length) == TESTS_STARTS_WITH_) {
          var test = new TestWrapper_(this.suite_, propName);
          var testResult = test.run();
          
          this.suiteResult.total++;
          
          if (testResult.success) {
            this.suiteResult.passed++;
          } else {
            this.suiteResult.failed++;
            this.suiteResult.status = Status_.FAILING;
          }
          
          this.suiteResult.testsResults.push(testResult);
        } 
      } 
      
      if (this.suite_[AFTER_ALL_TESTS_FUNC_]) {
        this.suite_[AFTER_ALL_TESTS_FUNC_]();
      }
      
      this.suiteResult.message = getElapsedMsg_(this.suiteResult.lastRunMs);
      
    } catch (error) {
      this.suiteResult.status = Status_.FAILING;
      this.suiteResult.message = getErrorMsg_(error);
    }
    
    return this.suiteResult;  
  }
  
  SuiteWrapper_.prototype.logResult = function() {
    var resultLog = "\n\nTEST SUITE RESULT: \n\n" + this.suiteResult.name + " - " + this.suiteResult.status + " (" + this.suiteResult.message + ")"
    + "\ntotal: " + this.suiteResult.total 
    + "\npassed: " + this.suiteResult.passed 
    + "\ntfailed: " + this.suiteResult.failed 
    + "\nTests results:"; 
    
    for (var i = 0; i < this.suiteResult.testsResults.length; i++) {
      var testRes = this.suiteResult.testsResults[i];
      resultLog += "\n\t" + testRes.name + " (" + testRes.message + ")";
    }
    
    Logger.log(resultLog);
    
    Logger.log("\n\n Test results published at \n\n " + this.suiteResult.url + " \n\n");
    
  }
  
  
}
