function doGet(request) {
  
  var namespace = request.parameter.namespace;
  var suite = request.parameter.suite;
  var format = request.parameter.format;
  
  var suiteResult = GSTestRunner.getSuiteResult(suite, namespace);
  
  if (format == "json") {
    return ContentService.createTextOutput(JSON.stringify(suiteResult)).setMimeType(ContentService.MimeType.JSON);
  } else {
    var template = HtmlService.createTemplateFromFile('SuiteResultView');
    
    template.suiteResult = suiteResult;
    
    var title = "GSTest results for ";
    if (suite) {
      title += suite;
    } else if (namespace) {
      title += namespace;
    }
    
    return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(title);
  }
  
}

function normalize_(text) {
  return BkperUtils.normalizeText(text,  "_");
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.IFRAME).getContent();
}
