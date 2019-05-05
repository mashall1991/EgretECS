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
var TestUI1 = (function (_super) {
    __extends(TestUI1, _super);
    function TestUI1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skinName = "resource/eui_skins/test/uiTestSkin1.exml";
        _this.needMask = false;
        _this.animation = PopUpAnimation.Scale;
        return _this;
    }
    return TestUI1;
}(UIComponent));
__reflect(TestUI1.prototype, "TestUI1");
//# sourceMappingURL=TestUI1.js.map