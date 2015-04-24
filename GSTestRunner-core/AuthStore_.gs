var AuthStore_ = {
  
  getAuthorizedUsers: function(suiteName, namespace) {
    var key = getStoreKey_(suiteName, namespace, "auth_");
    var authorizedUsersJSON = AuthStore_.getFromCacheFirst_(key);
    if (authorizedUsersJSON != null) {
      return JSON.parse(authorizedUsersJSON);
    }
    return null;
  },
  
  includeUsers: function(authorizedUsers, recipients, suiteName, namespace) {
    
    for(var i = 0; i < recipients.length; i++) {
      var userEmail = recipients[i];
      if (authorizedUsers == null) {
        authorizedUsers = new Array();
      }
      
      if (userEmail == null) {
        continue;
      }
      
      userEmail = userEmail.trim();
      
      if (!contains_(authorizedUsers, userEmail)) {
        authorizedUsers.push(userEmail);
        var key = getStoreKey_(suiteName, namespace, "auth_");
        var authorizedUsersJSON = JSON.stringify(authorizedUsers);
        AuthStore_.storeWithCache_(key, authorizedUsersJSON);
      }
    }
  },
  
  storeWithCache_: function(key, value) {
    Logger.log("Storing: " + value);
    PropertiesService.getScriptProperties().setProperty(key, value);
    CacheService.getScriptCache().put(key, value, 21600)
  }, 
  
  getFromCacheFirst_: function(key) {
    var value = CacheService.getScriptCache().get(key);
    if (value == null) {
      Logger.log("Reading from Properties")
      value = PropertiesService.getScriptProperties().getProperty(key);
      CacheService.getScriptCache().put(key, value, 21600)
    } else {
      Logger.log("Reading from cache: " + value);
    }
    return value;
  }
}

