var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameSystem = (function () {
    function GameSystem() {
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
}());
__reflect(GameSystem.prototype, "GameSystem", ["ISystem"]);
