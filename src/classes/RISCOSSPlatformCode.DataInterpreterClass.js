XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("command", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Command",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});
