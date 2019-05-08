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
var UILayerType;
(function (UILayerType) {
    //最上
    UILayerType[UILayerType["UITop"] = 1] = "UITop";
    UILayerType[UILayerType["UITips"] = 2] = "UITips";
    //中间
    UILayerType[UILayerType["UIMid"] = 3] = "UIMid";
    //最下
    UILayerType[UILayerType["UIBottom"] = 4] = "UIBottom";
})(UILayerType || (UILayerType = {}));
var UIEntity = (function (_super) {
    __extends(UIEntity, _super);
    function UIEntity() {
        //这里为了方便把数据放在了Entity里，在实际编程中Entity应当只包含组件，后面会更改此处代码
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * UI组件和系统的映射字典
         */
        _this.compAndSysMap = {};
        /**
         * UI弹出堆栈,
         */
        _this.uiStack = new Array();
        return _this;
    }
    return UIEntity;
}(Entity));
__reflect(UIEntity.prototype, "UIEntity");
//# sourceMappingURL=UIEntity.js.map