XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("description", props.TextArea.create({
    "customDisplay": "",
    "editor": "Text",
    "picker": "0",
    "prettyName": "Description",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("goalModel", props.DBList.create({
    "classname": "",
    "customDisplay": "{{velocity}}\n#set($propertyClass = $object.getxWikiClass().get($name))\n#if ($type == 'edit')\n  #set($selectName = \"${prefix}${name}\")\n  {{html clean=\"false\" wiki=\"false\"}}\n    <select name=\"$selectName\">\n    #if($!value == \"\")\n      <option value='' selected='selected'>None</option>\n    #else\n      <option value=''>None</option>\n    #end\n    #foreach($key in $propertyClass.getListValues())\n      #set($checked = '')\n      #if($value == $key)\n        #set($checked = \"selected='selected'\")\n      #end\n      <option value=\"$key\" $checked>$key</option>\n    #end\n    </select>\n  {{/html}}\n#else\n  $doc.displayView($propertyClass, $prefix, $object)\n#end\n{{/velocity}}",
    "idField": "",
    "picker": "0",
    "prettyName": "Goal model",
    "sort": "none",
    "sql": "SELECT doc.fullName FROM XWikiDocument doc, BaseObject obj WHERE doc.fullName=obj.name AND doc.space='RISCOSSPlatformGoalModels' AND obj.className='RISCOSSPlatformModelManagerCode.GoalModelClass'",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
  xcl.addProp("riskCategories", props.DBList.create({
    "classname": "",
    "customDisplay": "",
    "displayType": "checkbox",
    "idField": "",
    "multiSelect": "1",
    "picker": "0",
    "prettyName": "Risk categories",
    "relationalStorage": "1",
    "sort": "none",
    "sql": "SELECT doc.fullName FROM XWikiDocument doc, BaseObject obj WHERE doc.fullName=obj.name AND doc.space='RISCOSSPlatformRiskCategories' AND obj.className='RISCOSSPlatformRiskConfigurationManagerCode.RiskCategoryClass'",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
  xcl.addProp("autoEvaluate", props.XBoolean.create({
    "prettyName": "Automatically run risk evaluation for all compatible entities",
    "displayType": "checkbox"
  }));
});
