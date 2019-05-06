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
var UILoadSystem = (function () {
    function UILoadSystem() {
    }
    UILoadSystem.prototype.execute = function () {
        console.log("UIloadSystem executed.");
        World.shareInstance.createEntity(UILoadEntity);
    };
    UILoadSystem.prototype.loadResource = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoaded, loadingView, uILoadEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isLoaded = RES.isGroupLoaded(group);
                        console.log("Is group :" + group + " loaded? " + isLoaded);
                        if (!(!isLoaded)) return [3 /*break*/, 2];
                        loadingView = this.createLoadingView();
                        Main.STAGE.addChild(loadingView);
                        return [4 /*yield*/, RES.loadGroup(group, 0, this)];
                    case 1:
                        _a.sent();
                        uILoadEntity = World.shareInstance.getEntity(UILoadEntity);
                        uILoadEntity.removeComponent(loadingView);
                        Main.STAGE.removeChild(loadingView);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UILoadSystem.prototype.onProgress = function (current, total) {
        var uILoadEntity = World.shareInstance.getEntity(UILoadEntity);
        var loadingView = uILoadEntity.getComponent(LoadingUI);
        loadingView.textField.text = "Loading " + "(" + Math.floor(current / total * 100) + " %)..";
    };
    UILoadSystem.prototype.createLoadingView = function () {
        var uILoadEntity = World.shareInstance.getEntity(UILoadEntity);
        var loadingView = uILoadEntity.addComponent(LoadingUI);
        if (!loadingView.maskBg) {
            loadingView.maskBg = new egret.Sprite();
            loadingView.maskBg.touchEnabled = true;
            loadingView.maskBg.graphics.beginFill(1, 0.7);
            loadingView.maskBg.graphics.drawRect(0, 0, StageSystem.stageWidth, StageSystem.stageHeight);
            loadingView.maskBg.graphics.endFill();
            loadingView.addChild(loadingView.maskBg);
        }
        loadingView.textField = new egret.TextField();
        loadingView.addChild(loadingView.textField);
        loadingView.textField.y = StageSystem.stageHeight / 2;
        loadingView.textField.x = StageSystem.stageWidth / 2;
        loadingView.textField.width = 480;
        loadingView.textField.height = 100;
        loadingView.textField.anchorOffsetX = 240;
        loadingView.textField.anchorOffsetY = 50;
        loadingView.textField.textAlign = "center";
        loadingView.textField.text = "Loading " + "(0 %)..";
        return loadingView;
    };
    return UILoadSystem;
}());
__reflect(UILoadSystem.prototype, "UILoadSystem", ["ISystem", "RES.PromiseTaskReporter"]);
