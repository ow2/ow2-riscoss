XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("interpreterName", props.XString.create({
    "prettyName": "Document name of Data Interpreter",
  }));
});
