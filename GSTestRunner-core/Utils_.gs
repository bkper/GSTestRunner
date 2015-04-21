function getElapsedMsg_(start) {
  return ((Date.now() - start) / 1000) + "s";
}

function getErrorMsg_(error) {
  var message = "\n" + error;
  if (error['stack']) {
    message += "\n" + error["stack"];
  }
  return message;
}


