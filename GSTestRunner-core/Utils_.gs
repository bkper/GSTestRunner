function getElapsedMsg_(start) {
  return ((Date.now() - start) / 1000) + "s";
}

function getErrorMsg_(error) {
  var message = error;
  if (error['stack']) {
    message = message + "\n" + error["stack"];
  }
  return message;
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.IFRAME).getContent();
}
