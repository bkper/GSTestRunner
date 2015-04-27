function runSuite(event) {

  //Trick to know if is triggered by time trigger
  var isRunningByTimeTrigger = event != null;
  
  var options = { 
    namespace: "bkper",
    notify: isRunningByTimeTrigger,
    recipient: "bkper-dev@googlegroups.com",
    errorOnFail: !isRunningByTimeTrigger, 
    testCodeUrl: "https://script.google.com/a/nimbustecnologia.com.br/d/1xh1cmKeHZFNAwu3apMSsLMX8U4KZn2NEnMd8Pb9wQ2LRvUx0OBMVF8wx/edit",
  }
  
  var result = GSTestRunner.runSuite(this, "GSTestRunner", options);
}

function testBeforesAndAfters() {
  var suite = {
    log: "",
    
    beforeSuite_: function() {
      this.log += "beforeSuite_";
    },
    beforeTest_: function() {
      this.log += "beforeTest_";
    },
    
    test1: function() {
      this.log += "test1_";
    },
    
    test2: function() {
      this.log += "test2_";
      bad();
    },
    
    afterTest_: function() {
      this.log += "afterTest_";
    },
    afterSuite_: function() {
      this.log += "afterSuite_";
    },
  }
  
  GSTestRunner.runSuite(suite, "GSTestRunner_TEST", {namespace:"bkper"})
  GSUnit.assertEquals("beforeSuite_beforeTest_test1_afterTest_beforeTest_test2_afterTest_afterSuite_", suite.log);
  suite.log = "";
  GSTestRunner.runTest(suite, "test1");
  GSUnit.assertEquals("beforeSuite_beforeTest_test1_afterTest_afterSuite_", suite.log);
}

function testRunSuite() {
  var suite = {
    test1: function() {
      //ok
    },
    test2: function() {
      nonExistingFunction();
    },
    test3: function() {
      //ok
    },
  }
  var suiteResult = GSTestRunner.runSuite(suite, "GSTestRunner_TEST_2", {namespace:"bkper", recipient: "test@nimbustecnologia.com.br"})
  
  GSUnit.assertEquals(3, suiteResult.total);
  GSUnit.assertEquals(1, suiteResult.failed);
  GSUnit.assertEquals(2, suiteResult.passed);
}

function testRunTest() {
  var suite = {
    test1: function() {
      //ok
    },
    test2: function() {
      nonExistingFunction();
    },
  }
  
  var testResult = GSTestRunner.runTest(suite, "test1");
  GSUnit.assertTrue(testResult.success);
  
  try {
    testResult = GSTestRunner.runTest(suite, "test2");    
    GSUnit.fail("Tests in error should raise exception")
  } catch(err) {
    //ok
  }
}

function testGetSuiteResult() {
  var unknownResult = GSTestRunner.getSuiteResult("Non existent suite",  "non existent namespace")
  GSUnit.assertEquals("UNKNOWN", unknownResult.status);
  
  //Fill suite
  testRunSuite();
  
  var suiteResult = GSTestRunner.getSuiteResult("GSTestRunner_TEST_2",  "bkper")
  
  GSUnit.assertEquals(3, suiteResult.total);
  GSUnit.assertEquals(1, suiteResult.failed);
  GSUnit.assertEquals(2, suiteResult.passed);
  
}



