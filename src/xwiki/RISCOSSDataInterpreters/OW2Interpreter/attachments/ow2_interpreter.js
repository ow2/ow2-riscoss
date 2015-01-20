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

var Fs = require('fs');


var lessThan = function (array) {
    return function (input, name) {
        var n = input.get(name);
        var i = 0;
        for (; i < array.length; i++) {
            if (n < array[i]) { break; }
        }
        return {
            val: i / array.length,
            raw: n
        };
    };
};

var greaterThan = function (array) {
    return function (input, name) {
        var n = input.get(name);
        var i = 0;
        for (; i < array.length; i++) {
            if (n > array[i]) { break; }
        }
        return {
            val: i / array.length,
            raw: n
        };
    };
};

var OMM_MAP = {
    omm_Maintainability: 'omm_MST',
    omm_Stakeholders: 'omm_STK',
    omm_Licenses: 'omm_LCS',
    omm_Configuration: 'omm_CM',
    omm_planning: 'omm_PP',
    omm_Standards: 'omm_STD',
    omm_Commits: 'omm_DFCT',
    omm_testing: 'omm_QTP',
    omm_Roadmap: 'omm_RDMP',
    omm_Requirements: 'omm_REQM',
    omm_documentation: 'omm_PDOC',
    omm_Software: 'omm_ENV'
};

var ommRename = function (func) {
    return function (input, name) {
        return func(input, OMM_MAP[name]);
    }
};

var CONF = {
    Unique_Lic: (function () {
        var lt = lessThan([3,6,10,60]);
        return function (input, name) {
            if (input.get(name) === 0) { return { val: 61, raw: 0 }; }
            return lt(input, name);
        }
    }()),

    Ratio_No_Lic: (function () {
        var lt = lessThan([0.05, 0.30, 0.60, 0.80]);
        return function (input, name) {
            return lt({
                get: function (x) {
                    var noFiles = input.get('No_Files');
                    return (noFiles === 0) ? 0 : (input.get('Files_No_License') / noFiles)
                }
            }, '_unused_');
        }
    }()),

    Blocker_Issue: lessThan([1, 3, 5, 10]),

    Critical_Issue: lessThan([5, 10, 30, 50]),

    Test_Coverage: greaterThan([80, 50, 30, 10]),

    Test_Success: greaterThan([0.999, 0.9, 0.8, 0.2]),

    omm_Software: ommRename(lessThan([0.01, 2, 4, 6])), // 'omm_ENV'
    omm_documentation: ommRename(lessThan([2, 4, 8, 9])), // 'omm_PDOC'
    omm_Configuration: ommRename(lessThan([0.01, 2, 4, 6])), // 'omm_CM'
    omm_Licenses: ommRename(lessThan([0.01, 2, 4, 6])), // 'omm_LCS'
    omm_Stakeholders: ommRename(lessThan([0.01, 2, 4, 8])), // 'omm_STK'
    omm_Maintainability: ommRename(lessThan([0.01, 2, 3, 4])), // 'omm_MST'
    omm_planning: ommRename(lessThan([0.01, 1, 2, 3, 4])), // 'omm_PP'
    omm_Standards: ommRename(lessThan([-1, 0.01, 4, Math.Infinity])), // 'omm_STD'
    omm_Commits: ommRename(lessThan([-1.01,2.01,4.01,6.01])), // 'omm_DFCT',
    omm_testing: ommRename(lessThan([-1, 0.01, 5, 7])), // 'omm_QTP',
    omm_Roadmap: ommRename(lessThan([-1, 0.01, 1.01, 2.01])), // 'omm_RDMP',
    omm_Requirements: ommRename(lessThan([-1, 0.01, 1.01, 2.01])), // 'omm_REQM',
    omm_documentation: ommRename(lessThan([2, 4, 8, Math.Infinity])), // 'omm_PDOC',
    omm_Software: ommRename(lessThan([0.01, 2.01, 4.01, 5.01])), // 'omm_ENV'

    Project_Activity: function (input) {
        return {
            val: input.get('Project_Activity'),
            raw: input.get('Project_Activity')
        };
    },
    Number_Contribs: greaterThan([20,10,5,2]),
    Number_Devs: greaterThan([30, 15, 6, 2]),

    Activity_Ratio: (function () {
        var gt = greaterThan([100, 60, 30, 10]);
        return function (input, name) {
            return gt({
                get: function () {
                    var numDevs = input.get('Number_Devs');
                    return (numDevs === 0) ? 0 : (input.get('Number_Contribs') / numDevs);
                }
            }, '');
        }
    }()),

    Test: function () { return { val: 0.1, raw: 0.1 }; }
};

var DIST_SIZES = {
    "omm_Software": 5,
    "omm_documentation": 5,
    "Critical_Issue": 5,
    "omm_Requirements": 3,
    "Number_Contribs": 5,
    "Unique_Lic": 5,
    "Blocker_Issue": 5,
    "Project_Activity": 5,
    "Activity_Ratio": 5,
    "omm_Roadmap": 4,
    "omm_testing": 4,
    "Ratio_No_Lic": 5,
    "Test_Coverage": 5,
    "Number_Devs": 5,
    "omm_Commits": 5,
    "Test": 4,
    "omm_Standards": 3,
    "omm_planning": 5,
    "omm_Maintainability": 5,
    "Test_Success": 5,
    "omm_Stakeholders": 5,
    "omm_Licenses": 5,
    "omm_Configuration": 5
};

var DESCRIPTIONS = {
    "omm_Software": "OMM development environment risk",
    "omm_documentation": "OMM documentation risk",
    "Critical_Issue": "Number of open issues labeled critical",
    "omm_Requirements": "OMM requirements engineering risk",
    "Number_Contribs": "Number of contributors",
    "Unique_Lic": "Number of software copyright licenses",
    "Blocker_Issue": "Number of open issues labeled blocker",
    "Project_Activity": "OpenHub project activity level",
    "Activity_Ratio": "Risk from many contributors / few maintainers",
    "omm_Roadmap": "OMM roadmap quality risk",
    "omm_testing": "OMM testing risk",
    "Ratio_No_Lic": "Ratio of files with no license header",
    "Test_Coverage": "Test Coverage",
    "Number_Devs": "OW2Forge number of developers",
    "omm_Commits": "OMM risk from open bug reports",
    "Test": "unused",
    "omm_Standards": "OMM standards related risk",
    "omm_planning": "OMM planning related risk",
    "omm_Maintainability": "OMM maintainability risk",
    "Test_Success": "Risk from test failures",
    "omm_Stakeholders": "OMM risk from lack of effective stakeholders",
    "omm_Licenses": "OMM software copyright license risk",
    "omm_Configuration": "OMM risk from configuration"
};

var distributize = function (num, name) {
    var out = new Array(DIST_SIZES[name]);
    if (num >= 1) { num = 0.99999; }
    var x = Math.floor(num * out.length);
    for (var i = 0; i < out.length; i++) { out[i] = (x === i) ? 1 : 0; }
    return out;
};

var randomize = function (val) {
    var x = 0;
    var ni = -1;
    for (var i = 0; i < val.length; i++) {
        if (val[i]) {
            ni = i;
            continue;
        }
        val[i] = Math.random() * 0.05;
        x += val[i];
    }
    val[ni] -= x;
    return val;
};

var evaluate = function (json) {
    var out = {};
    var input = {
        get: function (x) {
            if (!x in json) { throw new Error("no such entry [" + x + "] in input"); }
            return json.result[x].value;
        }
    };
    for (var elem in CONF) {
        var result = CONF[elem](input, elem);
        var dist;
        if (result.raw < 0) {
            result.raw = -1;
            dist = new Array(DIST_SIZES[elem]);
            for (var i = 0; i < dist.length; i++) { dist[i] = 1 / dist.length; }
        } else {
            dist = randomize(distributize(result.val, elem));
        }
        out[elem] = {
            value: {
                values: dist
            },
            rawValue: result.raw,
            type: "DISTRIBUTION",
            description: DESCRIPTIONS[elem]
        };
    }
    return { "result": out, "warnings": [] };
};

var getInputs = function () {
    var out = {};
    for (var elem in CONF) {
        CONF[elem]({
            get: function (x) {
                out[x] = {
                    type:"NUMBER",
                    value:-1,
                    description:DESCRIPTIONS[x]
                };
            }
        }, elem);
    }
    return { "result": out, "warnings": [] };
};

var print = function (out) {
    console.log('-----BEGIN ANALYSIS OUTPUT-----');
    console.log(JSON.stringify(out, null, '  '));
    console.log('-----END ANALYSIS OUTPUT-----');
};

var readFile = function (fileName, cb) {
    if (fileName === '-') {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        var data = "";
        process.stdin.on('data', function(chunk) { data += chunk; });
        process.stdin.on('end', function() { cb(data); });
    } else {
        Fs.readFile(fileName, function (err, ret) {
            if (err) { throw err; }
            return cb(ret.toString('utf8'));
        });
    }
};

var main = function () {
    if (process.argv.indexOf('getInputs') !== -1) {
        print(getInputs());
        return;
    } else if (process.argv.indexOf('evaluate') !== -1) {
        var evidx = process.argv.indexOf('evaluate');
        readFile(process.argv[evidx+1], function (data) {
            print(evaluate(JSON.parse(data)));
        });
    }

};
main();
