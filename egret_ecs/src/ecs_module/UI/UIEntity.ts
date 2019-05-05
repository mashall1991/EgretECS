
enum UILayerType{
	//最上
	UITop = 1,
	UITips,
	//中间
	UIMid,
	//最下
	UIBottom
}
class UIEntity extends Entity{

	/**
	 * UI组件和系统的映射字典
	 */
	public compAndSysMap:Object = {}
	/**
	 * UI弹出堆栈
	 */
	public uiStack:Array<UIComponent> = new Array<UIComponent>()
	public layerTop:eui.UILayer 
	public layerTips:eui.UILayer
	public layerMiddle:eui.UILayer 
	public layerBottom:eui.UILayer 

}