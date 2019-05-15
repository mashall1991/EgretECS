class TestUISystem1 extends UISystem {
	
	public execute()
	{
		console.log("TestUISystem1,execute")
	}
	public onActive()
	{
		console.log("TestUISystem1,onActive")
		World.shareInstance.getSystem(SoundSystem).playMusic("test1.mp3").catch((e)=>{console.log(e)})
	}
	public onUILoaded()
	{
		console.log("TestUISystem1,onUILoaded")
	}
	public onShow()
	{
		console.log("TestUISystem1,onShow")
		let sys = World.shareInstance.getSystem(UIManageSystem)
		let comp = sys.FindUIComponentWithSysId(this.instanceId) as TestUI1
		comp.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this);
		comp.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenTouch,this);
	}
	public onHide()
	{
		console.log("TestUISystem1,onHide")
	}
	private onCloseTouch()
	{
		console.log("close TestUI1")
		let sys = World.shareInstance.getSystem(UIManageSystem)
		sys.closeUI(TestUI1)
	}
	private onOpenTouch()
	{
		let sys = World.shareInstance.getSystem(UIManageSystem)
		sys.regist(TestUI2,TestUISystem2)
		sys.openUI(TestUI2).then((ui)=>{})
		World.shareInstance.getSystem(SoundSystem).playSoundEffect("diamond.mp3")
	}
	public onAnimationEnd()
	{
		console.log("TestUI1 animationEnd")
	}
}