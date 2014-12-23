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
var Http = require('http');
// http://www.ow2.org/xwiki/bin/download/ActivitiesDashboard/SAT4J/OMM4RI.SAT4j.csv

var parse = function (data) {
    var out = [];
    var lines = data.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var pieces = lines[i].split(',');
        out.push({id:pieces[0], value:pieces[1]});
    }
    return out;
};

var makeReq = function (url, callback) {
    var out = [];
    Http.request(url, function (resp) {
        resp.on('data', function (chunk) { out.push(chunk.toString('utf8')); });
        resp.on('end', function () {
            callback(parse(out.join('')));
        });
    }).end();
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
