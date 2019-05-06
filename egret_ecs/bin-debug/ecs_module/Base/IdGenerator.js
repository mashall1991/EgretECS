var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IdGenerator = (function () {
    function IdGenerator() {
    }
    Object.defineProperty(IdGenerator, "AppId", {
        get: function () {
            return this.appId;
        },
        set: function (value) {
            this.appId = value;
            this.instanceIdGenerator = this.appId << 48;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdGenerator, "GenerateId", {
        get: function () {
            var time = egret.getTimer();
            return (this.appId << 48) + (time << 16) + ++this.value;
        },
        enumerable: true,
        configurable: true
    });
    IdGenerator.GenerateInstanceId = function () {
        return ++this.instanceIdGenerator;
    };
    IdGenerator.instanceIdGenerator = 0;
    return IdGenerator;
}());
__reflect(IdGenerator.prototype, "IdGenerator");
//# sourceMappingURL=IdGenerator.js.map