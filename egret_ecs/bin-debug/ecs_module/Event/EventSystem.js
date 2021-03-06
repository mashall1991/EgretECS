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
var EventSystem = (function (_super) {
    __extends(EventSystem, _super);
    function EventSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventSystem.prototype.execute = function () {
        var entity = World.shareInstance.createEntity(EventEntity);
        entity.addComponent(EventDispatcherComponent);
    };
    EventSystem.prototype.getEventEntity = function () {
        return World.shareInstance.getEntity(EventEntity);
    };
    EventSystem.prototype.addEventListener = function (type, listener, target, useCapture, priority) {
        var entity = this.getEventEntity();
        var eventDispatcher = entity.getComponent(EventDispatcherComponent);
        eventDispatcher.addEventListener(type, listener, target, useCapture, priority);
    };
    EventSystem.prototype.removeEventListener = function (type, listener, target, useCapture) {
        var entity = this.getEventEntity();
        var eventDispatcher = entity.getComponent(EventDispatcherComponent);
        eventDispatcher.removeEventListener(type, listener, target, useCapture);
    };
    EventSystem.prototype.dispatchEvent = function (type, param) {
        if (param === void 0) { param = null; }
        var event = egret.Event.create(EventMetaComponent, type, false, false);
        event.data = param;
        var entity = this.getEventEntity();
        var eventDispatcher = entity.getComponent(EventDispatcherComponent);
        eventDispatcher.dispatchEvent(event);
        egret.Event.release(event);
    };
    return EventSystem;
}(System));
__reflect(EventSystem.prototype, "EventSystem");
//# sourceMappingURL=EventSystem.js.map