var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FilterSystem = (function () {
    function FilterSystem() {
    }
    FilterSystem.prototype.execute = function () {
        console.log("FilterSystem , execute()");
    };
    return FilterSystem;
}());
__reflect(FilterSystem.prototype, "FilterSystem", ["ISystem"]);
