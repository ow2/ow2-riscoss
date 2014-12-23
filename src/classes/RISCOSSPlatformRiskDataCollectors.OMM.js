XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("url", props.XString.create({
    "prettyName": "OMM URL",
    "size": "30"
  }));
});
