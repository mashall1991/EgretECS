var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManageSystem = (function () {
    function UIManageSystem() {
    }
    UIManageSystem.prototype.execute = function () {
        var uiEn = World.shareInstance.createEntity(UIEntity);
        var gameEn = World.shareInstance.getEntity(GameEntity);
        var main = gameEn.getComponent(GameComponent).main;
        /**********隐藏层************/
        uiEn.layerBottom = new eui.UILayer;
        main.addChild(uiEn.layerBottom);
        /**********Panel UI 使用层 begin*********** */
        uiEn.layerMiddle = new eui.UILayer;
        main.addChild(uiEn.layerMiddle);
        /*************Panel UI 使用层 end******** */
        /**********提示类UI层************/
        uiEn.layerTips = new eui.UILayer;
        uiEn.layerTips.touchEnabled = false;
        main.addChild(uiEn.layerTips);
        uiEn.layerTop = new eui.UILayer;
        uiEn.layerTop.touchEnabled = false;
        main.addChild(uiEn.layerTop);
    };
    UIManageSystem.prototype.regist = function (uicpnt, uisys) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var name = ClassUtil.getClassName(uicpnt);
        if (uiEn.compAndSysMap[name]) {
            console.warn(name + " [UIComponent] has already registed.");
            return uiEn.compAndSysMap[name];
        }
        else {
            var uiComponent = new uicpnt();
            var sys = World.shareInstance.createSystem(uisys);
            var dic = { ui: uiComponent, system: sys };
            uiEn.compAndSysMap[name] = dic;
            sys.execute();
            return dic;
        }
    };
    UIManageSystem.prototype.openUI = function (uicpnt, layerType) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var name = ClassUtil.getClassName(uicpnt);
        var uiDic = uiEn.compAndSysMap[name];
        if (uiDic == null) {
            console.error("UI:" + name + " does not regist.");
            return null;
        }
        var uiComponent = uiDic.ui;
        if (this.didUIOpen(uicpnt)) {
            console.error("UI:" + name + " has opened do not open it again.");
        }
        var uiSystem = uiDic.system;
        var targetLayer = uiEn.layerMiddle;
        if (layerType != null) {
            switch (layerType) {
                case UILayerType.UIBottom:
                    targetLayer = uiEn.layerBottom;
                    break;
                case UILayerType.UIMid:
                    targetLayer = uiEn.layerMiddle;
                    break;
                case UILayerType.UITips:
                    targetLayer = uiEn.layerTips;
                    break;
                case UILayerType.UITop:
                    targetLayer = uiEn.layerTop;
                    break;
            }
        }
        uiComponent.addEventListener(egret.Event.ADDED_TO_STAGE, uiSystem.addToStage, uiSystem);
        uiComponent.addEventListener(egret.Event.REMOVED_FROM_STAGE, uiSystem.removeToStage, uiSystem);
        uiEn.uiStack.push(uiComponent);
        targetLayer.addChild(uiComponent);
    };
    /**
     * 关闭UI面板
     * @param uicpnt UIComponent类名
     * @param destroy 是否销毁，目前暂不支持传入此参数
     */
    UIManageSystem.prototype.closeUI = function (uicpnt, destory) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var popedUI = uiEn.uiStack.pop();
        if (ClassUtil.getInstanceClassName(popedUI) == ClassUtil.getClassName(uicpnt)) {
            UIManageSystem.removeDisplay(popedUI);
            this.activeTopUI();
        }
        else {
            console.error("You should close ui which is on the top first.");
            uiEn.uiStack.push(popedUI);
        }
    };
    /**
     * 关闭UI面板
     * @param uicpnt UIComponent实例
     */
    UIManageSystem.prototype.closeUI_ = function (uicpnt) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var popedUI = uiEn.uiStack.pop();
        if (ClassUtil.getInstanceClassName(popedUI) == ClassUtil.getInstanceClassName(uicpnt)) {
            UIManageSystem.removeDisplay(popedUI);
            this.activeTopUI();
        }
        else {
            console.error("You should close ui which is on the top first.");
            uiEn.uiStack.push(popedUI);
        }
    };
    UIManageSystem.prototype.didUIOpen = function (uicpnt) {
        var isOpen = false;
        var uiEn = World.shareInstance.getEntity(UIEntity);
        for (var k in uiEn.uiStack) {
            var uicomp = uiEn.uiStack[k];
            if (ClassUtil.getInstanceClassName(uicomp) == ClassUtil.getClassName(uicpnt))
                isOpen = true;
        }
        return isOpen;
    };
    UIManageSystem.prototype.didUIOnActive = function (uicpnt) {
        return false;
    };
    UIManageSystem.prototype.isTop = function (uicpntInstance) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        if (uiEn.uiStack.length >= 1) {
            var lastIndex = uiEn.uiStack.length - 1;
            var uiComponent = uiEn.uiStack[lastIndex];
            return ClassUtil.getInstanceClassName(uiComponent) == ClassUtil.getInstanceClassName(uicpntInstance);
        }
        return true;
    };
    /**
     * 根据系统的instanceId查找与之对应的UIComponent
     */
    UIManageSystem.prototype.FindUIComponentWithSysId = function (instanceId) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        for (var k in uiEn.compAndSysMap) {
            var pair = uiEn.compAndSysMap[k];
            var sys = pair.system;
            if (sys.instanceId == instanceId) {
                return pair.ui;
            }
        }
        return null;
    };
    UIManageSystem.prototype.activeTopUI = function () {
        var uipair = this.findTopPair();
        if (uipair != null) {
            var sys = uipair.system;
            sys.onActive();
        }
    };
    UIManageSystem.prototype.findTopPair = function () {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var len = uiEn.uiStack.length;
        if (len >= 1) {
            var uiComp = uiEn.uiStack[len - 1];
            return uiEn.compAndSysMap[ClassUtil.getInstanceClassName(uiComp)];
        }
        return null;
    };
    UIManageSystem.removeDisplay = function (dis, parent) {
        if (parent === void 0) { parent = null; }
        if (!dis)
            return;
        if (!parent) {
            parent = dis.parent;
        }
        if (!parent)
            return;
        parent.removeChild(dis);
    };
    return UIManageSystem;
}());
__reflect(UIManageSystem.prototype, "UIManageSystem", ["ISystem"]);
//# sourceMappingURL=UIManageSystem.js.map