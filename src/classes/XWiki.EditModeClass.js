XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("defaultEditMode", props.XString.create({
    "prettyName": "Default Edit Mode",
    "size": "15"
  }));
});