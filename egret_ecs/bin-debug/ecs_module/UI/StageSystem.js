var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StageSystem = (function () {
    function StageSystem() {
    }
    Object.defineProperty(StageSystem, "stageWidth", {
        /**
         * @description 获取舞台宽度
         */
        get: function () {
            return Main.STAGE.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageSystem, "stageHeight", {
        /**
         * @description 获取舞台高度
         */
        get: function () {
            return Main.STAGE.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    StageSystem.prototype.execute = function () {
        var scaleMode = StageSystem.getStageScale();
        Main.STAGE.scaleMode = scaleMode;
        Main.STAGE.addEventListener(egret.Event.RESIZE, this.stageSizeChangeHandler, this);
        Main.STAGE.addEventListener(egret.Event.ACTIVATE, this.activateHandler, this);
        Main.STAGE.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
    };
    StageSystem.prototype.activateHandler = function (event) {
        // SoundManager.getInstance().reStartMusic();
    };
    StageSystem.prototype.deactivateHandler = function (event) {
        // SoundManager.getInstance().stopMusic();
    };
    StageSystem.prototype.stageClickHandler = function (event) {
        // Tnotice.ins.setNoticeLoc(event.stageX, event.stageY);
    };
    StageSystem.prototype.stageSizeChangeHandler = function () {
        egret.setTimeout(function () {
            var scaleMode = StageSystem.getStageScale();
            StageSystem.scaleMode = scaleMode;
            Main.STAGE.scaleMode = scaleMode;
            var evtSys = World.shareInstance.getSystem(EventSystem);
            evtSys.dispatchEvent(StageSystem.STAGE_RESIZE);
            console.log("Resize stage,sacleMode:" + scaleMode + " height:" + window.innerHeight + " width:" + window.innerWidth);
        }, this, 500);
    };
    /**
     * 获得舞台的适配模式
     *
     */
    StageSystem.getStageScale = function () {
        var scaleMode = "";
        var w = window.innerHeight / window.innerWidth;
        var minSizeProb = 1.7;
        var maxSizeProb = 1.8;
        if (w < 1.5) {
            scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        else if (w > minSizeProb && w < maxSizeProb) {
            scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else {
            scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        return scaleMode;
    };
    StageSystem.STAGE_RESIZE = "STAGE_RESIZE";
    return StageSystem;
}());
__reflect(StageSystem.prototype, "StageSystem", ["ISystem"]);
//# sourceMappingURL=StageSystem.js.map