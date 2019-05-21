var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity = (function () {
    function Entity() {
        this.instanceId = IdGenerator.GenerateInstanceId();
        this.components = {};
        this.componentList = new Array();
    }
    Entity.prototype.Entity = function () { };
    Entity.prototype.addComponent = function (component, multiple) {
        if (multiple === void 0) { multiple = false; }
        var cp = new component();
        var type = ClassSystem.getInstanceClassName(cp);
        var c = this.components[type];
        if (c == null) {
            this.components[type] = cp;
        }
        if (multiple)
            this.componentList.push(cp);
        return this.components[type];
    };
    Entity.prototype.addComponent_ = function (component, multiple) {
        if (multiple === void 0) { multiple = false; }
        var type = ClassSystem.getInstanceClassName(component);
        var c = this.components[type];
        if (multiple)
            this.componentList.push(component);
        if (c == null) {
            this.components[type] = component;
            return component;
        }
        return c;
    };
    Entity.prototype.removeComponent = function (component) {
        var index = this.componentList.indexOf(component);
        if (index != -1) {
            this.componentList.splice(index, 1);
        }
        var type = ClassSystem.getInstanceClassName(component);
        if (this.components[type]) {
            delete this.components[type];
        }
        else {
            console.warn("Entity:" + ClassSystem.getInstanceClassName(this) + " does not contain " + type + " .");
        }
    };
    Entity.prototype.getComponent_ = function (t) {
        var type = ClassSystem.getInstanceClassName(t);
        var c = this.components[type];
        if (c == null) {
            console.warn("Entity:" + ClassSystem.getInstanceClassName(this) + " does not contain " + type + " .");
        }
        return c;
    };
    Entity.prototype.getComponentByName = function (name) {
        var c = this.components[name];
        if (c == null) {
            console.warn("Entity:" + ClassSystem.getInstanceClassName(this) + " does not contain " + name + " .");
        }
        return c;
    };
    Entity.prototype.getComponent = function (cl) {
        var name = ClassSystem.getClassName(cl);
        var c = this.components[name];
        if (c == null) {
            console.warn("Entity:" + ClassSystem.getInstanceClassName(this) + " does not contain " + name + " .");
        }
        return c;
    };
    Entity.prototype.getComponents = function (cl, multiple) {
        if (multiple === void 0) { multiple = false; }
        var array = [];
        if (multiple) {
            for (var k in this.componentList) {
                var c = this.componentList[k];
                if (ClassSystem.getClassName(cl) == ClassSystem.getInstanceClassName(c))
                    array.push(c);
            }
        }
        else {
            for (var k in this.components) {
                var c = this.components[k];
                if (ClassSystem.getClassName(cl) == ClassSystem.getInstanceClassName(c))
                    array.push(c);
            }
        }
        return array;
    };
    return Entity;
}());
__reflect(Entity.prototype, "Entity", ["IComponent"]);
//# sourceMappingURL=Entity.js.map