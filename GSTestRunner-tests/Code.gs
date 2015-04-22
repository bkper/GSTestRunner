function runSuite(evt) {
  
  var options = {
    namespace: "bkper",
    //Trick
    notify: evt != null,
    recipient: "krishna@nimbustecnologia.com.br",
    testCodeUrl: "https://script.google.com/a/nimbustecnologia.com.br/d/1xh1cmKeHZFNAwu3apMSsLMX8U4KZn2NEnMd8Pb9wQ2LRvUx0OBMVF8wx/edit",
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
    throw "Failing test!!!";
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



