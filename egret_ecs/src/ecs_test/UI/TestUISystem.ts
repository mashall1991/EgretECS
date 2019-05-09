class TestUISystem extends UISystem {
	
	public execute()
	{
		console.log("TestUISystem,execute")
	}
	public onActive()
	{
		console.log("TestUISystem,onActive")
		let timer = World.shareInstance.getSystem(TimerSystem)
		timer.start()
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
		let timer = World.shareInstance.getSystem(TimerSystem)
		timer.schedule(this.callInSecond,this,1)

	}
	public onHide()
	{
		console.log("TestUISystem,onHide")
	}
	public onAnimationEnd()
	{
		console.log("TestUI animationEnd")
	}
	private onCloseTouch()
	{
		console.log("close TestUI")
	}
	private onOpenTouch()
	{
		let sys = World.shareInstance.getSystem(UIManageSystem)
		sys.regist(TestUI1,TestUISystem1)
		sys.openUI(TestUI1).then((ui)=>{})
		let timer = World.shareInstance.getSystem(TimerSystem)
		// timer.removeSchedule(this.callInSecond,this)
		timer.pause()
	}
	private callInSecond()
	{
		console.log(" timer call back.");
	}
}