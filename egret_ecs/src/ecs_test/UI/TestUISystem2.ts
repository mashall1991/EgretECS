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
		let animSys = World.shareInstance.getSystem(AnimationSystem)
		let sys = World.shareInstance.getSystem(UIManageSystem)
		let comp = sys.FindUIComponentWithSysId(this.instanceId) as TestUI2
		animSys.createAnimation("knight",AnimationType.DragonBoneAnimation,1,true).then((animComp:AnimationComponent)=>
		{
			comp.addChild(animComp.animator)
			animComp.animator.x = StageSystem.stageWidth / 2
			animComp.animator.y = StageSystem.stageHeight / 2
			animSys.play(animComp,"animation")
		})
		animSys.createAnimation("2001",AnimationType.ImageSequenceAnimation,1,true).then((animComp:AnimationComponent)=>
		{
			console.log("2001 loaded")
			comp.addChild(animComp.animator)
			animComp.animator.x = StageSystem.stageWidth / 2
			animComp.animator.y = StageSystem.stageHeight / 2 + 200
			animSys.play(animComp,"stand_left")
		})
		animSys.createAnimation("2001",AnimationType.ImageSequenceAnimation,1,false).then((animComp:AnimationComponent)=>
		{
			console.log("2001 loaded")
			animComp.autoRemove = true
			comp.addChild(animComp.animator)
			animComp.animator.x = StageSystem.stageWidth / 2 + 50
			animComp.animator.y = StageSystem.stageHeight / 2 + 200
			animSys.addAnimationCompleteListener(animComp,this.OnAnimationComplete,this,[animComp])
			// 测试多次注册事件
			// animSys.addAnimationCompleteListener(animComp,this.OnAnimationComplete,this,[animComp])
			// animSys.addAnimationCompleteListener(animComp,this.OnAnimationComplete,this,[animComp])
			animSys.play(animComp,"attack_left")
		})
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
	private OnAnimationComplete(animComp:AnimationComponent)
	{
		console.log("OnAnimationComplete")	
		console.log(animComp.name)	
		let animSys = World.shareInstance.getSystem(AnimationSystem)
		animSys.removeAnimationCompleteListener(animComp,this,this.OnAnimationComplete)
	}

}