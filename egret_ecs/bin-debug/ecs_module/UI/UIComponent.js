var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 窗口弹出动画
 */
var PopUpAnimation;
(function (PopUpAnimation) {
    PopUpAnimation[PopUpAnimation["Scale"] = 0] = "Scale";
    PopUpAnimation[PopUpAnimation["MoveUp"] = 1] = "MoveUp";
    PopUpAnimation[PopUpAnimation["None"] = 2] = "None";
})(PopUpAnimation || (PopUpAnimation = {}));
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.instanceId = IdGenerator.GenerateInstanceId();
        _this.maskAlpha = 0.7;
        _this.centerFlag = true;
        _this.clickMaskToHide = true;
        _this.animation = PopUpAnimation.Scale;
        _this.resourceLoaded = false;
        return _this;
    }
    return UIComponent;
}(eui.Component));
__reflect(UIComponent.prototype, "UIComponent", ["IComponent"]);
//# sourceMappingURL=UIComponent.js.map