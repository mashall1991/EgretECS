var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var World = (function () {
    function World() {
        this.entityArray = new Array();
        /**
         * 所有实体
         */
        this.entities = {};
        /**
         * 所有系统
         */
        this.systems = {};
        /**
         * 统一调度update的系统
         */
        this.updateSystems = [];
    }
    Object.defineProperty(World, "shareInstance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**过滤具有某些组件的实体
     * @param components 类数组 eg. [A,B,C] A,B,C为继承自Component的类名
     * @return 实体数组
     */
    World.prototype.entityFilter = function (components) {
        var compNames = [];
        var entities = [];
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            var str = ClassSystem.getClassName(comp);
            compNames.push(str);
        }
        for (var k in this.entityArray) {
            var containAllComponents = true;
            var en = this.entityArray[k];
            for (var i = 0; i < compNames.length; i++) {
                var componentName = compNames[i];
                var comp = en.getComponentByName(componentName);
                containAllComponents = !(comp == null);
            }
            if (containAllComponents)
                entities.push(en);
        }
        return entities;
    };
    World.prototype.getEntity = function (entity) {
        return this.entities[ClassSystem.getClassName(entity)];
    };
    /**
     * 创建实体
     * @param entity 实体类名
     * @param multiple 是否为多个实体，多个实体的话会保存进数组，取实体的时候必须用entityFilter函数
     */
    World.prototype.createEntity = function (entity, multiple) {
        if (multiple === void 0) { multiple = false; }
        var e = new entity();
        if (!multiple) {
            this.entities[ClassSystem.getInstanceClassName(e)] = e;
        }
        this.entityArray.push(e);
        return e;
    };
    /**
     * 创建系统
     */
    World.prototype.createSystem = function (sys) {
        var sysName = ClassSystem.getClassName(sys);
        var system = this.systems[sysName];
        if (system == null) {
            system = new sys();
            this.systems[sysName] = system;
            var types = sys.prototype["__types__"];
            for (var k in types) {
                var systemType = types[k];
                if (systemType == "IUpdateSystem")
                    this.updateSystems.push(system);
            }
        }
        return system;
    };
    /**
     * 获取System
     */
    World.prototype.getSystem = function (sys) {
        return this.systems[ClassSystem.getClassName(sys)];
    };
    World._instance = new World();
    return World;
}());
__reflect(World.prototype, "World");
//# sourceMappingURL=World.js.map