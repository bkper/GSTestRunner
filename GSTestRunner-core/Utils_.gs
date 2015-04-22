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

function getStoreKey_(suiteName, namespace) {
  if (namespace == null) {
    namespace = "_____undefined____";
  }
  return suiteName + "_" + namespace;
}

function getBadgeURL_(suiteName, namespace) {
  var badgeURL = RESULT_BADGE_BASE_URL_ + "?suite=" + suiteName;
  if (namespace != null) {
    badgeURL += "&namespace=" + namespace;
  }
  return badgeURL;
}

function getResultURL_(suiteName, namespace) {
  var resultURL = PUBLISH_RESULTS_BASE_URL_ + "?suite=" + suiteName;
  if (namespace != null) {
    resultURL += "&namespace=" + namespace
  }
  return resultURL;
}

function contains_(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return true
    }
  }
  return false;
}





