function doGet(request) {
  
  var organization = request.parameter.organization;
  var project = request.parameter.project;
  var format = request.parameter.format;
  
  var result = ResultStore_.load(organization, project);
  
  if (result == null) {
    result = {
      project: project,
      organization: organization,
      status: Status.UNKNOWN,
      total: 0,
      totalSuccess: 0,
      totalFail: 0,
      tests: new Array(),
      message: "???",
      lastRun: new Date(1970, 0, 1).getTime(),
    }
  }
  
  if (format == "json") {
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } else {
    var template = HtmlService.createTemplateFromFile('ResultView');
    template.result = result;
    var title = "GSTest results for ";
    if (project) {
      title += project;
    } else if (organization) {
      title += organization;
    }
    
    return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(title);
  }
  
}
