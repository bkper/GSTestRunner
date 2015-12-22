var AuthStore_ = {
  
  getAuthorizedUsers: function(suiteName, namespace) {
    var key = getStoreKey_(suiteName, namespace, "auth_");
    var authorizedUsersJSON = readProperty_(key);
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
        storeProperty_(key, authorizedUsersJSON);
      }
    }
  },
 
}

