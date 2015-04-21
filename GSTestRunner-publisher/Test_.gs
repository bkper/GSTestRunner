function Test_(script, name) {
  
  this.script_ = script;
  this.name_ = name;
  
  Test_.prototype.run = function() {
    
    var start = Date.now();
    
    //Result format
    var result = {
      name: this.name_,
      success: true,
    }
    
    try {
      
      if (this.script_[BEFORE_EACH_TEST_FUNC_]) {
        this.script_[BEFORE_EACH_TEST_FUNC_]();
      }
      
      this.script_[this.name_]();
      
      if (this.script_[AFTER_EACH_TEST_FUNC_]) {
        this.script_[AFTER_EACH_TEST_FUNC_]();
      }      
      
      result.message = getElapsedMsg_(start);
      
    } catch (error) {
      result.success = false;
      result.message = getErrorMsg_(error);
    }
    
    return result;
    
  }
}


