var FailureNotifier_ = {
  
  notifyFailures: function(suiteResult, options) {
    
    if (suiteResult.failed > 0 && options.notify == true) {
      
      var subject = "[GSTestRunner] " + suiteResult.name + " test failed!";
      
      var body = "\n\n Total: " + suiteResult.total
      + "\n Passed: " + suiteResult.passed
      + "\n Failed: " + suiteResult.failed
      + "\n\n";
      
      for (var i = 0; i < suiteResult.testsResults.length; i++) {
        var testRes = suiteResult.testsResults[i];
        if (testRes.success == false) {
          body += testRes.name + ": " + testRes.message + "\n";
        }
      }
      
      
      body += "\n\n Results: " + suiteResult.url;
      
      if (suiteResult.testCodeUrl) {
        body += "\n\n Test Code: " + options.testCodeUrl;
      }

      
      var effectiveUserEmail = Session.getEffectiveUser().getEmail();
      
      if (options.recipient == null) {
        options.recipient = effectiveUserEmail;
      }
      
      if (options.recipient.indexOf(effectiveUserEmail) < 0) {
        options.recipient += ", " + effectiveUserEmail;
      }
      
      MailApp.sendEmail(options.recipient, subject, body);       
    }
    
  },
  
}

