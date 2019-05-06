var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity = (function () {
    function Entity() {
        this.instanceId = IdGenerator.GenerateInstanceId();
        this.components = {};
    }
    Entity.prototype.Entity = function () { };
    Entity.prototype.addComponent = function (component) {
        var cp = new component();
        var type = ClassUtil.getInstanceClassName(cp);
        var c = this.components[type];
        if (c == null) {
            this.components[type] = cp;
        }
        return this.components[type];
    };
    Entity.prototype.addComponent_ = function (component) {
        var type = ClassUtil.getInstanceClassName(component);
        var c = this.components[type];
        if (c == null) {
            this.components[type] = component;
            return component;
        }
        return c;
    };
    Entity.prototype.removeComponent = function (component) {
        var type = ClassUtil.getInstanceClassName(component);
        if (this.components[type]) {
            delete this.components[type];
        }
        else {
            console.warn("Entity:" + ClassUtil.getInstanceClassName(this) + " does not contain " + type + " .");
        }
    };
    Entity.prototype.getComponent_ = function (t) {
        var type = ClassUtil.getInstanceClassName(t);
        var c = this.components[type];
        if (c == null) {
            console.warn("Entity:" + ClassUtil.getInstanceClassName(this) + " does not contain " + type + " .");
        }
        return c;
    };
    Entity.prototype.getComponentByName = function (name) {
        var c = this.components[name];
        if (c == null) {
            console.warn("Entity:" + ClassUtil.getInstanceClassName(this) + " does not contain " + name + " .");
        }
        return c;
    };
    Entity.prototype.getComponent = function (cl) {
        var name = ClassUtil.getClassName(cl);
        var c = this.components[name];
        if (c == null) {
            console.warn("Entity:" + ClassUtil.getInstanceClassName(this) + " does not contain " + name + " .");
        }
        return c;
    };
    Entity.prototype.getComponents = function () {
        var array = [];
        for (var k in this.components) {
            var c = this.components[k];
            array.push(c);
        }
        return array;
    };
    return Entity;
}());
__reflect(Entity.prototype, "Entity", ["IComponent"]);
