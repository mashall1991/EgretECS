"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var resjsons = ["resource/default.res.json"]; //要扫描的res.json文件
var targetDir = "resource/TextureMerger"; //输出目录
var pathNor = path.relative(targetDir, "resource"); //返回一个相对路径
var tempindex = 0;
//创建输出文件夹
if (resjsons.length > 0) {
    if (!fs.existsSync(targetDir)) {
        var paths = path.normalize(targetDir).split("\\");   //windows 下使用
        // var paths = path.normalize(targetDir).split("\/");   //mac linux 下使用
        var target = ".";
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var p = paths_1[_i];
            target += ("\\" + p);  // windows 下使用
            // target += ("\/" + p);  // mac linux 下使用
            if (!fs.existsSync(target))
                // 根据路径创建文件夹
                fs.mkdirSync(target);
        }
    }
}
var _loop_1 = function (resJson) {
    // 判断是否是res.json文件
    if (fs.existsSync(resJson) && resJson.indexOf("res.json") > -1) {
        var defaultJson = fs.readFileSync(resJson, "utf-8");
        // 解析res.json文件内容
        var defaultObject = JSON.parse(defaultJson);
        var groups = defaultObject.groups; //组
        var resources = defaultObject.resources; //资源
        var resourcesHash_1 = {}; // 用来存放resources的资源信息
        // 遍历resources
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            resourcesHash_1[resource.name] = resource.url;
        }
        // 遍历groups
        for (var _a = 0, groups_1 = groups; _a < groups_1.length; _a++) {
            var group = groups_1[_a];
            var tmproject = {}; //用来存放tmproject文件的信息
            // tmproject文件配置
            tmproject["options"] = {
                "layoutMath": "2",
                "sizeMode": "2n",
                "useExtension": 1,
                "layoutGap": 1,
                "extend": 0
            };
            // projectName
            tmproject["projectName"] = group.name + "_" + tempindex; 
            // 版本
            tmproject["version"] = 5;
            tempindex++;
            // 获取res.json分组的keys, 并分割成数组
            var oldkeys = group.keys.split(","); 
            var oldkeysHash = {};
            // 遍历oldkeys
            for (var _b = 0, oldkeys_1 = oldkeys; _b < oldkeys_1.length; _b++) {
                var key = oldkeys_1[_b];
                // 保存到oldkeysHash对象中
                oldkeysHash[key] = true;
            }
            var newKeys = [];
            // 遍历oldkeys
            for (var _c = 0, oldkeys_2 = oldkeys; _c < oldkeys_2.length; _c++) {
                var key = oldkeys_2[_c];
                if (key.indexOf("json") == -1) {
                    if (!oldkeysHash[key.replace("png", "json")]) { //粒子和龙骨对应的图集不合图
                        if (!oldkeysHash[key.replace("png", "fnt")]) //位图字体
                            newKeys.push(key);
                    }
                    else if (key.indexOf("jpg") > -1) {
                        newKeys.push(key);
                    }
                }
            }
            oldkeysHash = {};
            oldkeys = [];
            // files路径
            var urls = newKeys.map(function (key) {
                return path.join(pathNor, resourcesHash_1[key]);
            });
            tmproject["files"] = urls;
            // 根据tmproject写入文件
            if (urls.length > 0) {
                fs.writeFileSync(path.join(targetDir, tmproject["projectName"] + ".tmproject"), JSON.stringify(tmproject));
            }
            tmproject = {};
        }
    }
};
//根据数组开始扫描
for (var _a = 0, resjsons_1 = resjsons; _a < resjsons_1.length; _a++) {
    var resJson = resjsons_1[_a];
    _loop_1(resJson);
}