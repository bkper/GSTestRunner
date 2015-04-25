[TDD]: http://en.wikipedia.org/wiki/Test-driven_development
[GSUnit]: https://sites.google.com/site/scriptsexamples/custom-methods/gsunit
[CI]: http://en.wikipedia.org/wiki/Continuous_integration
[Google Apps Script]: https://developers.google.com/apps-script/


# GSTestRunner  [![GSTests status](https://gs-tests-status.appspot.com/badge.svg?suite=GSTestRunner&namespace=bkper)](https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec?suite=GSTestRunner&namespace=bkper)

Library to RUN tests, PUBLISH results and send email NOTIFICATIONS of [Google Apps Script] failures.

GSTestRunner helps with [TDD] and also set a lightweight [CI] for your GS code.

This library does NOT provide assertions. For that, we suggest [GSUnit].

#Get Started

Add the library through project key: **Mv3gVv8-YsY7WWlQhoAGWgpNuZToV6OsP**

Create a script with test methods starting with "test". Example:

````javascript

function runSuite() {
  GSTestRunner.runSuite(this, "Get Started");
}

function testA_() {
  Logger.log("Good code!");
}

function testB_() {
  Logger.log("Bad code!");
  nonExistingFunction();
}


````

Then, run the suite passing "this" object to the suite, and set a trigger to periodically run, depending on your needs - every hour would be good ;)

The suite result based on code above can be found here: [![GSTests status](https://gs-tests-status.appspot.com/badge.svg?suite=Get Started)](https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec?suite=Get Started)

If you are testing another library, don't forget to let the Development Mode on, so the test will run always on latest code version.


#Befores and Afters



#Options

#Suite Result

#Status Badges



