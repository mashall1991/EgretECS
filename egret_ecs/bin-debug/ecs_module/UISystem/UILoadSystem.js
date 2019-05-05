var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UILoadSystem = (function () {
    function UILoadSystem() {
    }
    UILoadSystem.prototype.execute = function () {
        console.log("UIloadSystem executed.");
    };
    return UILoadSystem;
}());
__reflect(UILoadSystem.prototype, "UILoadSystem", ["ISystem"]);
//# sourceMappingURL=UILoadSystem.js.map