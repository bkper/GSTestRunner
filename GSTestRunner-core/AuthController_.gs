var AuthController_ = {
   
  checkAuthorization: function(suiteName, options) {
    var namespace = options.namespace;
    var authorizedUsers = AuthStore_.getAuthorizedUsers(suiteName, namespace);
    var effectiveUserEmail = Session.getEffectiveUser().getEmail();
    
    if (authorizedUsers != null && !contains_(authorizedUsers, effectiveUserEmail)) {
      //TODO Check authorization on Googlegroups
      if (namespace != null) {
        suiteName = namespace + "/" + suiteName;
      }
      var authUsersStr = authorizedUsers.join(", ");
      throw "Suite name " + suiteName + " already taken! Change the name/namespace, or ask one of those guys to include you as recipient: [" + authUsersStr + "]";
    } else {
      var recipients = options.recipient.split(",");
      AuthStore_.includeUsers(authorizedUsers, recipients, suiteName, namespace);
    }
  }
  
}
