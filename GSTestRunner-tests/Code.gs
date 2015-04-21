function runSuite() {
  
  var options = {
    organization: "bkper",
    
  }
  
  var result = GSTestRunner.runSuite(this, "BkperApp", options);
}

function beforeAllTests_() {
  Logger.log("beforeAllTests");
}

function beforeEachTest_() {
  Logger.log("beforeEachTest");
}

function test1() {
  //  throw "Failing test!!!";
}

function test2() {
  Logger.log("Passing testsssss")
}

function test3() {
  Logger.log("alalalalal")
}

function afterEachTest_() {
  Logger.log("afterEachTest");
}

function afterAllTests_() {
  Logger.log("afterAllTests");
}



