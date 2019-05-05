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
var TestUISystem1 = (function (_super) {
    __extends(TestUISystem1, _super);
    function TestUISystem1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestUISystem1.prototype.execute = function () {
        console.log("TestUISystem1,execute");
    };
    TestUISystem1.prototype.onActive = function () {
        console.log("TestUISystem1,onActive");
    };
    TestUISystem1.prototype.onUILoaded = function () {
        console.log("TestUISystem1,onUILoaded");
    };
    TestUISystem1.prototype.onShow = function () {
        console.log("TestUISystem1,onShow");
        var sys = World.shareInstance.getSystem(UIManageSystem);
        var comp = sys.FindUIComponentWithSysId(this.instanceId);
        comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
        comp.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenTouch, this);
    };
    TestUISystem1.prototype.onHide = function () {
        console.log("TestUISystem1,onHide");
    };
    TestUISystem1.prototype.onCloseTouch = function () {
        console.log("close TestUI1");
        var sys = World.shareInstance.getSystem(UIManageSystem);
        sys.closeUI(TestUI1);
    };
    TestUISystem1.prototype.onOpenTouch = function () {
        var sys = World.shareInstance.getSystem(UIManageSystem);
        sys.regist(TestUI2, TestUISystem2);
        sys.openUI(TestUI2);
    };
    TestUISystem1.prototype.onAnimationEnd = function () {
        console.log("TestUI1 animationEnd");
    };
    return TestUISystem1;
}(UISystem));
__reflect(TestUISystem1.prototype, "TestUISystem1");
//# sourceMappingURL=TestUISystem1.js.map