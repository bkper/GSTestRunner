function Suite_(script, organization, project) {
  
  this.script_ = script;
  this.organization_ = organization;
  this.project_ = project;
  
  Suite_.prototype.run = function() {
    
    //Result format
    var result =  {
      project: this.project_,
      organization: this.organization_,
      success: true,
      total: 0,
      totalSuccess: 0,
      totalFail: 0,
      tests: new Array(),
      message: "",
      lastRun: Date.now(),
      
    };
    
    try {
      
      if (this.script_[BEFORE_ALL_TESTS_FUNC_]) {
        this.script_[BEFORE_ALL_TESTS_FUNC_]();
      }  
      
      for (var propName in this.script_) {
        if (propName.substring(0, TESTS_STARTS_WITH_.length) == TESTS_STARTS_WITH_) {
          var test = new Test_(this.script_, propName);
          var testResult = test.run();
          
          result.total++;
          
          if (testResult.success) {
            result.totalSuccess++;
          } else {
            result.totalFail++;
            result.success = false;          
          }
          
          result.tests.push(testResult);
        } 
      } 
      
      if (this.script_[AFTER_ALL_TESTS_FUNC_]) {
        this.script_[AFTER_ALL_TESTS_FUNC_]();
      }
      
      result.message = getElapsedMsg_(result.lastRun);
      
    } catch (error) {
      result.success = false;
      result.message = getErrorMsg_(error);
    }
    
    return result;  
  }
  
}
