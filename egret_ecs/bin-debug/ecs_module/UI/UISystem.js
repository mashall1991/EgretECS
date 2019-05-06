var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UISystem = (function () {
    function UISystem() {
        this.instanceId = IdGenerator.GenerateInstanceId();
    }
    UISystem.prototype.addToStage = function () {
        var _this = this;
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
        if (ui.centerFlag) {
            ui.anchorOffsetX = ui.width / 2;
            ui.anchorOffsetY = ui.height / 2;
            ui.x = StageSystem.stageWidth / 2;
            ui.y = StageSystem.stageHeight / 2;
        }
        sys.activeTopUI();
        this.doOpenAnimaton(ui, function () {
            ui.alpha = 1;
            ui.scaleX = 1;
            ui.scaleY = 1;
            _this.onAnimationEnd();
        });
        this.onShow();
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
                .call(callBack);
        }
        else if (ui.animation == PopUpAnimation.MoveUp) {
            //TODO:增加移入动画
            callBack();
        }
        else {
            callBack();
        }
    };
    UISystem.prototype.doCloseAnimaton = function (ui, callBack) {
    };
    return UISystem;
}());
__reflect(UISystem.prototype, "UISystem", ["ISystem", "IAddToStageSystem", "IRemoveToStageSystem", "IShowSystem", "IHideSystem", "OnAnimationEndSystem"]);
//# sourceMappingURL=UISystem.js.map