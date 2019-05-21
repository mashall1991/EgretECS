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
var GameSystem = (function (_super) {
    __extends(GameSystem, _super);
    function GameSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameSystem.prototype.execute = function () {
        var en = World.shareInstance.createEntity(GameEntity);
        var comp = en.addComponent(GameComponent);
        comp.stage = Main.STAGE;
        comp.main = Main.mainEntrace;
        comp.gameInitTime = egret.getTimer();
        comp.frameListenner = new egret.Sprite();
        comp.lastFrameEventTime = comp.gameInitTime;
        var eventSys = World.shareInstance.getSystem(EventSystem);
        comp.frameListenner.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    GameSystem.prototype.update = function () {
        var world = World.shareInstance;
        var en = world.getEntity(GameEntity);
        var comp = en.getComponent(GameComponent);
        var frameTime = egret.getTimer();
        var deltaTime = (frameTime - comp.lastFrameEventTime) / 1000;
        comp.lastFrameEventTime = frameTime;
        comp.deltaTime = deltaTime;
        for (var i = 0; i < world.updateSystems.length; i++) {
            var updateSys = world.updateSystems[i];
            updateSys.update(deltaTime);
        }
    };
    return GameSystem;
}(System));
__reflect(GameSystem.prototype, "GameSystem");
//# sourceMappingURL=GameSystem.js.map