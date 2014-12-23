XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("url", props.XString.create({
    "prettyName": "Sonar URL",
    "size": "30"
  }));
});
