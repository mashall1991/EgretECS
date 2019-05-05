var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClassUtil = (function () {
    function ClassUtil() {
    }
    ClassUtil.getInstanceClassName = function (instance) {
        return instance["__proto__"]["__class__"];
    };
    ClassUtil.getClassName = function (cl) {
        return cl.prototype["__class__"];
    };
    return ClassUtil;
}());
__reflect(ClassUtil.prototype, "ClassUtil");
//# sourceMappingURL=ClassUtil.js.map