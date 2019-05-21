var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var System = (function () {
    function System() {
        this.instanceId = IdGenerator.GenerateInstanceId();
    }
    System.prototype.execute = function () { };
    return System;
}());
__reflect(System.prototype, "System", ["ISystem"]);
//# sourceMappingURL=ISystem.js.map