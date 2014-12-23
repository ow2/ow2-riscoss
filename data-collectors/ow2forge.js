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

// http://forge.ow2.org/project/memberlist.php?group_id=228

var makeReq = function (url, callback) {
    var out = [];
    JSDom.env(url, ["http://code.jquery.com/jquery.js"], function (errors, window) {
        var $ = window.$;
        out.push({ id:'Number_Devs', value: $('td[align="center"]:contains("Developer")').length });
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
