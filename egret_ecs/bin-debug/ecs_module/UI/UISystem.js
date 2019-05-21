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
var UISystem = (function (_super) {
    __extends(UISystem, _super);
    function UISystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.instanceId = IdGenerator.GenerateInstanceId();
        return _this;
    }
    UISystem.prototype.addToStage = function () {
        var sys = World.shareInstance.createSystem(UIManageSystem);
        var ui = sys.FindUIComponentWithSysId(this.instanceId);
        if (ui.needMask && ui.mask == null) {
            ui.maskBg = new egret.Sprite();
            ui.maskBg.touchEnabled = true;
            ui.maskBg.graphics.beginFill(1, ui.maskAlpha);
            ui.maskBg.graphics.drawRect(0, 0, StageSystem.stageWidth, StageSystem.stageHeight);
            ui.maskBg.graphics.endFill();
            ui.parent.addChildAt(ui.maskBg, ui.parent.getChildIndex(ui));
            if (ui.clickMaskToHide) {
                ui.maskBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.maskClickHandler, this);
            }
        }
        sys.activeTopUI();
        this.moveToCenter(ui);
        this.onShow();
        this.doOpenAnimaton(ui, this.animationCallBack);
    };
    UISystem.prototype.removeToStage = function () {
        var sys = World.shareInstance.createSystem(UIManageSystem);
        var ui = sys.FindUIComponentWithSysId(this.instanceId);
        if (ui.maskBg) {
            UIManageSystem.removeDisplay(ui.maskBg);
            ui.mask = null;
        }
        this.onHide();
    };
    UISystem.prototype.moveToCenter = function (ui) {
        if (ui.centerFlag) {
            ui.anchorOffsetX = ui.width / 2;
            ui.anchorOffsetY = ui.height / 2;
            ui.x = StageSystem.stageWidth / 2;
            ui.y = StageSystem.stageHeight / 2;
        }
    };
    UISystem.prototype.animationCallBack = function (ui) {
        ui.alpha = 1;
        ui.scaleX = 1;
        ui.scaleY = 1;
        this.onAnimationEnd();
    };
    UISystem.prototype.maskClickHandler = function () {
        console.log("mask touched");
        var sys = World.shareInstance.createSystem(UIManageSystem);
        var ui = sys.FindUIComponentWithSysId(this.instanceId);
        sys.closeUI_(ui);
    };
    UISystem.prototype.doOpenAnimaton = function (ui, callBack) {
        if (ui.animation == PopUpAnimation.Scale) {
            ui.scaleX = 0.8;
            ui.scaleY = 0.8;
            ui.alpha = 0.5;
            egret.Tween.get(ui).to({ alpha: 1 }, 100);
            egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, 150)
                .call(callBack, this, [ui]);
        }
        else if (ui.animation == PopUpAnimation.MoveUp) {
            //TODO:增加移入动画
            this.animationCallBack(ui);
        }
        else {
            this.animationCallBack(ui);
        }
    };
    //TODO:
    UISystem.prototype.doCloseAnimaton = function (ui, callBack) {
    };
    return UISystem;
}(System));
__reflect(UISystem.prototype, "UISystem", ["IAddToStageSystem", "IRemoveToStageSystem", "IShowSystem", "IHideSystem", "OnAnimationEndSystem"]);
//# sourceMappingURL=UISystem.js.map