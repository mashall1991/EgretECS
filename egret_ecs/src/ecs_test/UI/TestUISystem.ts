class TestUISystem extends UISystem {
	
	public execute()
	{
		console.log("TestUISystem,execute")
	}
	public onActive()
	{
		console.log("TestUISystem,onActive")
	}
	public onUILoaded()
	{
		console.log("TestUISystem,onUILoaded")
	}
	public onShow()
	{
		console.log("TestUISystem,onShow")
		let sys = World.shareInstance.getSystem(UIManageSystem)
		let comp = sys.FindUIComponentWithSysId(this.instanceId) as TestUI
		comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this)
		comp.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenTouch,this)
	}
	public onHide()
	{
		console.log("TestUISystem,onHide")
	}
	private onCloseTouch()
	{
		console.log("close TestUI")
	}
	private onOpenTouch()
	{
		let sys = World.shareInstance.getSystem(UIManageSystem)
		sys.regist(TestUI1,TestUISystem1)
		sys.openUI(TestUI1).then((ui)=>
		{
			
		})


	}
	public onAnimationEnd()
	{
		console.log("TestUI animationEnd")
	}
}