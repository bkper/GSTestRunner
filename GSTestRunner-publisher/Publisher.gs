function doGet(request) {
  
  var organization = request.parameter.organization;
  var suite = request.parameter.suite;
  var format = request.parameter.format;
  
  var suiteResult = GSTestRunner.getSuiteResult(suite, organization);
  
  if (format == "json") {
    return ContentService.createTextOutput(JSON.stringify(suiteResult)).setMimeType(ContentService.MimeType.JSON);
  } else {
    var template = HtmlService.createTemplateFromFile('SuiteResultView');
    template.suiteResult = suiteResult;
    var title = "GSTest results for ";
    if (suite) {
      title += suite;
    } else if (organization) {
      title += organization;
    }
    
    return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(title);
  }
  
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.IFRAME).getContent();
}
