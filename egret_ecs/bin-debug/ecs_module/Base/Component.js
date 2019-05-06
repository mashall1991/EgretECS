var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Component = (function () {
    function Component() {
        this.instanceId = IdGenerator.GenerateInstanceId();
    }
    return Component;
}());
__reflect(Component.prototype, "Component", ["IComponent"]);
