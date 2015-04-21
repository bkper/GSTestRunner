function doGet(request) {
  
  var organization = request.parameter.organization;
  var project = request.parameter.project;
  var format = request.parameter.format;
  
  var suiteResult = GSTestRunner.getSuiteResult(project, organization);
  
  if (format == "json") {
    return ContentService.createTextOutput(JSON.stringify(suiteResult)).setMimeType(ContentService.MimeType.JSON);
  } else {
    var template = HtmlService.createTemplateFromFile('SuiteResultView');
    template.suiteResult = suiteResult;
    var title = "GSTest results for ";
    if (project) {
      title += project;
    } else if (organization) {
      title += organization;
    }
    
    return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(title);
  }
  
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.IFRAME).getContent();
}
