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
var TestUISystem2 = (function (_super) {
    __extends(TestUISystem2, _super);
    function TestUISystem2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestUISystem2.prototype.execute = function () {
        console.log("TestUISystem2,execute");
    };
    TestUISystem2.prototype.onActive = function () {
        console.log("TestUISystem2,onActive");
    };
    TestUISystem2.prototype.onUILoaded = function () {
        var _this = this;
        console.log("TestUISystem2,onUILoaded");
        var animSys = World.shareInstance.getSystem(AnimationSystem);
        var sys = World.shareInstance.getSystem(UIManageSystem);
        var comp = sys.FindUIComponentWithSysId(this.instanceId);
        animSys.createAnimation("knight", AnimationType.DragonBoneAnimation, 1, true).then(function (animComp) {
            comp.addChild(animComp.animator);
            animComp.animator.x = StageSystem.stageWidth / 2;
            animComp.animator.y = StageSystem.stageHeight / 2;
            animSys.play(animComp, "animation");
        });
        animSys.createAnimation("2001", AnimationType.ImageSequenceAnimation, 1, true).then(function (animComp) {
            console.log("2001 loaded");
            comp.addChild(animComp.animator);
            animComp.animator.x = StageSystem.stageWidth / 2;
            animComp.animator.y = StageSystem.stageHeight / 2 + 200;
            animSys.play(animComp, "stand_left");
        });
        animSys.createAnimation("2001", AnimationType.ImageSequenceAnimation, 1, false).then(function (animComp) {
            console.log("2001 loaded");
            animComp.autoRemove = true;
            comp.addChild(animComp.animator);
            animComp.animator.x = StageSystem.stageWidth / 2 + 50;
            animComp.animator.y = StageSystem.stageHeight / 2 + 200;
            animSys.addAnimationCompleteListener(animComp, _this.OnAnimationComplete, _this, [animComp]);
            // 测试多次注册事件
            // animSys.addAnimationCompleteListener(animComp,this.OnAnimationComplete,this,[animComp])
            // animSys.addAnimationCompleteListener(animComp,this.OnAnimationComplete,this,[animComp])
            animSys.play(animComp, "attack_left");
        });
    };
    TestUISystem2.prototype.onShow = function () {
        console.log("TestUISystem2,onShow");
        var sys = World.shareInstance.getSystem(UIManageSystem);
        var comp = sys.FindUIComponentWithSysId(this.instanceId);
        comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
        World.shareInstance.getSystem(SoundSystem).playMusic("test2.mp3");
    };
    TestUISystem2.prototype.onHide = function () {
        console.log("TestUISystem2,onHide");
    };
    TestUISystem2.prototype.onCloseTouch = function () {
        console.log("close TestUI2");
        var sys = World.shareInstance.getSystem(UIManageSystem);
        sys.closeUI(TestUI2);
    };
    TestUISystem2.prototype.onAnimationEnd = function () {
        console.log("TestUI2 animationEnd");
    };
    TestUISystem2.prototype.OnAnimationComplete = function (animComp) {
        console.log("OnAnimationComplete");
        console.log(animComp.name);
        var animSys = World.shareInstance.getSystem(AnimationSystem);
        animSys.removeAnimationCompleteListener(animComp, this, this.OnAnimationComplete);
    };
    return TestUISystem2;
}(UISystem));
__reflect(TestUISystem2.prototype, "TestUISystem2");
//# sourceMappingURL=TestUISystem2.js.map