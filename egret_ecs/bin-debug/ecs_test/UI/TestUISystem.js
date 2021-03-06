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
var TestUISystem = (function (_super) {
    __extends(TestUISystem, _super);
    function TestUISystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestUISystem.prototype.execute = function () {
        console.log("TestUISystem,execute");
    };
    TestUISystem.prototype.onActive = function () {
        console.log("TestUISystem,onActive");
        var timer = World.shareInstance.getSystem(TimerSystem);
        timer.start();
    };
    TestUISystem.prototype.onUILoaded = function () {
        console.log("TestUISystem,onUILoaded");
    };
    TestUISystem.prototype.onShow = function () {
        console.log("TestUISystem,onShow");
        var sys = World.shareInstance.getSystem(UIManageSystem);
        var comp = sys.FindUIComponentWithSysId(this.instanceId);
        comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
        comp.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenTouch, this);
        var timer = World.shareInstance.getSystem(TimerSystem);
        timer.schedule(this.callInSecond, this, 1);
    };
    TestUISystem.prototype.onHide = function () {
        console.log("TestUISystem,onHide");
    };
    TestUISystem.prototype.onAnimationEnd = function () {
        console.log("TestUI animationEnd");
    };
    TestUISystem.prototype.onCloseTouch = function () {
        console.log("close TestUI");
    };
    TestUISystem.prototype.onOpenTouch = function () {
        var sys = World.shareInstance.getSystem(UIManageSystem);
        sys.regist(TestUI1, TestUISystem1);
        sys.openUI(TestUI1).then(function (ui) { });
        var timer = World.shareInstance.getSystem(TimerSystem);
        // timer.removeSchedule(this.callInSecond,this)
        timer.pause();
    };
    TestUISystem.prototype.callInSecond = function () {
        console.log(" timer call back.");
    };
    return TestUISystem;
}(UISystem));
__reflect(TestUISystem.prototype, "TestUISystem");
//# sourceMappingURL=TestUISystem.js.map