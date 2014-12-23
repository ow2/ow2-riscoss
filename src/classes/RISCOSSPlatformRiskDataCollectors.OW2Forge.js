XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("url", props.XString.create({
    "prettyName": "OW2Forge URL",
    "size": "30"
  }));
});
