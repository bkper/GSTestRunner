var ResultStore_ = {
  
  save: function(result) {
    var resultJSON = JSON.stringify(result);
    PropertiesService.getScriptProperties().setProperty(result.organization + "_" + result.project, resultJSON);
  },
  
  load: function(organization, project) {
    var resultJSON = PropertiesService.getScriptProperties().getProperty(organization + "_" + project);
    if (resultJSON != null) {
      return JSON.parse(resultJSON);
    }
  },
  
}

function logAllProps() {
  Logger.log(JSON.stringify(PropertiesService.getScriptProperties().getProperties()))
  PropertiesService.getScriptProperties().deleteAllProperties();
}