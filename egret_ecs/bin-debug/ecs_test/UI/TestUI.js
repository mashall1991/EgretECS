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
var TestUI = (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skinName = "resource/eui_skins/test/uiTestSkin.exml";
        _this.needMask = false;
        _this.animation = PopUpAnimation.None;
        return _this;
    }
    return TestUI;
}(UIComponent));
__reflect(TestUI.prototype, "TestUI");
//# sourceMappingURL=TestUI.js.map