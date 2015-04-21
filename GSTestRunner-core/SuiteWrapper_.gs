function SuiteWrapper_(suite, organization, project) {
  
  this.suite_ = suite;
  this.organization_ = organization;
  this.project_ = project;
  
  this.suiteResult =  {
    organization: this.organization_,
    project: this.project_,
    status: Status_.PASSING,
    total: 0,
    totalSuccess: 0,
    totalFail: 0,
    testsResults: new Array(),
    message: "",
    lastRunMs: Date.now(),
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
            this.suiteResult.totalSuccess++;
          } else {
            this.suiteResult.totalFail++;
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
    var resultLog = "\n\nTEST SUITE RESULT: \n\n" + this.suiteResult.organization + "/" + this.suiteResult.project + " - " + this.suiteResult.status + " (" + this.suiteResult.message + ")";
    resultLog += "\ntotal: " + this.suiteResult.total; 
    resultLog += "\ntotal fail: " + this.suiteResult.totalFail; 
    resultLog += "\ntotal success: " + this.suiteResult.totalSuccess; 
    resultLog += "\nTests results:"; 
    
    for (var i = 0; i < this.suiteResult.testsResults.length; i++) {
      var testRes = this.suiteResult.testsResults[i];
      resultLog += "\n\t" + testRes.name + " (" + testRes.message + ")";
    }
    
    resultLog += "\n\n Test results published at \n\n https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec?project=" + this.suiteResult.project + "&organization=" + this.suiteResult.organization + "\n\n";
    
    Logger.log(resultLog);
  }
  
  
}
