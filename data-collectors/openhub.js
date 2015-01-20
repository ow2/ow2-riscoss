/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var JSDom = require("jsdom");

// https://www.openhub.net/p/org_sat4j

var getCount = function (name, $) {
    var k = $('td:contains(' + JSON.stringify(name) + ')');
    var x = k[k.length-1];
    return Number(x.previousSibling.textContent);
};

var projectActivity = function ($) {
    var act = $('#project_header_activity_indicator a').attr('title');
    switch (act) {
        case "Very High Activity": return 0;
        case "High Activity": return 1;
        case "Moderate Activity": return 2;
        case "Low Activity": return 3;
        case "Very Low Activity": return 4;
        default: return 5;
    }
};

var numberContribLast12Months = function ($) {
    // dont judge me
    return $('a[href="/p/org_sat4j/contributors?sort=latest_commit&time_span=12+months"]').
        prev().text();
};

var makeReq = function (url, callback) {
    var out = [];
    JSDom.env(url, ["http://code.jquery.com/jquery.js"], function (errors, window) {
        var $ = window.$;
        out.push({ id: 'Project_Activity', value: projectActivity($) });
        out.push({ id: 'Number_Contribs', value: numberContribLast12Months($) });
        callback(out);
    });
};

var run = function (conf) {
    makeReq(conf.url, function (data) {
        data.forEach(function (elem) {
            elem.type = 'NUMBER';
            elem.target = conf.targetEntity;
        });
        console.log('-----BEGIN RISK DATA-----');
        console.log(JSON.stringify(data));
        console.log('-----END RISK DATA-----');
    });
};

var main = function () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var data = "";
    process.stdin.on('data', function(chunk) { data += chunk; });
    process.stdin.on('end', function() { run(JSON.parse(data)); });
};
main();
