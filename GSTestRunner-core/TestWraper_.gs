function TestWrapper_(suite, name) {
  
  this.suite_ = suite;
  this.name_ = name;
  
  TestWrapper_.prototype.run = function() {
    
    var start = Date.now();
    
    //Test Result format
    var testResult = {
      name: this.name_,
      success: true,
    }
    
    try {
      
      if (this.suite_[BEFORE_TEST_FUNC_]) {
        this.suite_[BEFORE_TEST_FUNC_]();
      }
      
      this.suite_[this.name_]();
      
      if (this.suite_[AFTER_TEST_FUNC_]) {
        this.suite_[AFTER_TEST_FUNC_]();
      }      
      
      testResult.message = getElapsedMsg_(start);
      
    } catch (error) {
      testResult.success = false;
      testResult.message = getErrorMsg_(error);
    }
    
    return testResult;
    
  }
}


