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

function getBadgeURL_(suiteName, organization) {
  var badgeURL = RESULT_BADGE_BASE_URL_ + "?suite=" + suiteName;
  if (organization != null) {
    badgeURL += "&organization=" + organization;
  }
  return badgeURL;
}

function getResultURL_(suiteName, organization) {
  var resultURL = PUBLISH_RESULTS_BASE_URL_ + "?suite=" + suiteName;
  if (organization != null) {
    resultURL += "&organization=" + organization
  }
  return resultURL;
}





