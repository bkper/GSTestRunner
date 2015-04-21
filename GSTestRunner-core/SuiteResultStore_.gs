var SuiteResultStore_ = {
  
  save: function(suiteResult) {
    var suiteResultJSON = JSON.stringify(suiteResult);
    PropertiesService.getScriptProperties().setProperty(suiteResult.organization + "_" + suiteResult.project, suiteResultJSON);
  },
  
  load: function(organization, project) {
    var suiteResultJSON = PropertiesService.getScriptProperties().getProperty(organization + "_" + project);
    if (suiteResultJSON != null) {
      return JSON.parse(suiteResultJSON);
    }
  },
  
}
