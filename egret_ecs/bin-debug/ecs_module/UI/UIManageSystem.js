var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        var name = ClassSystem.getClassName(uicpnt);
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
    /**
     * 异步打开UI面板
     */
    UIManageSystem.prototype.openUI = function (uicpnt, layerType) {
        return __awaiter(this, void 0, void 0, function () {
            var uiEn, name, uiDic, uiComponent, UILoadSys, uiSystem, targetLayer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uiEn = World.shareInstance.getEntity(UIEntity);
                        name = ClassSystem.getClassName(uicpnt);
                        uiDic = uiEn.compAndSysMap[name];
                        if (uiDic == null) {
                            console.error("UI:" + name + " does not regist.");
                            return [2 /*return*/, null];
                        }
                        uiComponent = uiDic.ui;
                        if (this.didUIOpen(uicpnt)) {
                            console.error("UI:" + name + " has opened do not open it again.");
                        }
                        UILoadSys = World.shareInstance.getSystem(ResourceLoadSystem);
                        if (!uiComponent.resourceGroup) return [3 /*break*/, 2];
                        return [4 /*yield*/, UILoadSys.loadGroup(uiComponent.resourceGroup)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        uiSystem = uiDic.system;
                        targetLayer = uiEn.layerMiddle;
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
                        return [2 /*return*/, new Promise(function (resolve, reject) { resolve(uiComponent); })];
                }
            });
        });
    };
    /**
     * 关闭UI面板
     * @param uicpnt UIComponent类名
     * @param destroy 是否销毁，目前暂不支持传入此参数
     */
    UIManageSystem.prototype.closeUI = function (uicpnt, destory) {
        var uiEn = World.shareInstance.getEntity(UIEntity);
        var popedUI = uiEn.uiStack.pop();
        if (ClassSystem.getInstanceClassName(popedUI) == ClassSystem.getClassName(uicpnt)) {
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
        if (ClassSystem.getInstanceClassName(popedUI) == ClassSystem.getInstanceClassName(uicpnt)) {
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
            if (ClassSystem.getInstanceClassName(uicomp) == ClassSystem.getClassName(uicpnt))
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
            return ClassSystem.getInstanceClassName(uiComponent) == ClassSystem.getInstanceClassName(uicpntInstance);
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
            return uiEn.compAndSysMap[ClassSystem.getInstanceClassName(uiComp)];
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