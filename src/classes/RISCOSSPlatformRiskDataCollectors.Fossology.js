XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("url", props.XString.create({
    "prettyName": "Fossology URL",
    "size": "30"
  }));
});
