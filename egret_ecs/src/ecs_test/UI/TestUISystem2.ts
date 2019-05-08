class TestUISystem2 extends UISystem {
	
	public execute()
	{
		console.log("TestUISystem2,execute")
	}
	public onActive()
	{
		console.log("TestUISystem2,onActive")
	}
	public onUILoaded()
	{
		console.log("TestUISystem2,onUILoaded")
	}
	public onShow()
	{
		console.log("TestUISystem2,onShow")
		let sys = World.shareInstance.getSystem(UIManageSystem)
		let comp = sys.FindUIComponentWithSysId(this.instanceId) as TestUI2
		comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this)
		World.shareInstance.getSystem(SoundSystem).playMusic("test2.mp3")
		
	}
	public onHide()
	{
		console.log("TestUISystem2,onHide")
	}
	private onCloseTouch()
	{
		console.log("close TestUI2")
		let sys = World.shareInstance.getSystem(UIManageSystem)
		sys.closeUI(TestUI2)
	}
	public onAnimationEnd()
	{
		console.log("TestUI2 animationEnd")
	}
	

}