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

function getStoreKey_(suiteName, namespace, prefix) {
  if (namespace == null) {
    namespace = "_____undefined____";
  }
  return prefix + BkperUtils.normalizeText(suiteName + "_" + namespace, "-");
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
  if (array == null) {
    return false;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return true
    }
  }
  return false;
}

function ensureEffectiveUserAsRecipient_(options) {
  var effectiveUserEmail = Session.getEffectiveUser().getEmail();
  if (options.recipient == null) {
    options.recipient = effectiveUserEmail;
  }
  if (options.recipient.indexOf(effectiveUserEmail) < 0) {
    options.recipient += ", " + effectiveUserEmail;
  }
  return options;
}



