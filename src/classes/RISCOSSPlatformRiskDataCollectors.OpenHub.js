XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("url", props.XString.create({
    "prettyName": "OpenHub URL",
    "size": "30"
  }));
});
