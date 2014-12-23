XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("layer", props.DBList.create({
    "classname": "RISCOSSPlatformLayerManagerCode.LayerClass",
    "customDisplay": "",
    "idField": "",
    "picker": "0",
    "prettyName": "layer",
    "relationalStorage": "1",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
  xcl.addProp("riskModel", props.DBList.create({
    "classname": "RISCOSSPlatformModelManagerCode.RiskModelClass",
    "customDisplay": "",
    "idField": "",
    "picker": "0",
    "prettyName": "riskModel",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
});
