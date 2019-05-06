class TestUI1 extends UIComponent{
	public skinName = "resource/eui_skins/test/uiTestSkin1.exml"
	public needMask = false
	public title:eui.Label
	public btn_close:eui.Group
	public btn_open:eui.Group
	public animation = PopUpAnimation.Scale
	public resourceGroup:string = "test"
}