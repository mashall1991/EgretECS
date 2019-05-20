class AnimationLoader implements ISystem {

	public execute()
	{
	}

	public async loadAnimation(component:AnimationComponent):Promise<AnimationComponent>
	{
		if(component.type == AnimationType.DragonBoneAnimation)
		{
			let loadSys = World.shareInstance.getSystem(ResourceLoadSystem)
			let png = loadSys.getURL(PATH.ANIMATION,component.name + '_tex.png');
			let json = loadSys.getURL(PATH.ANIMATION,component.name + '_tex.json');
			let skeJson = loadSys.getURL(PATH.ANIMATION,component.name + '_ske.json');

			let pngData = await loadSys.loadResByURL(png)
			let textrueData = await loadSys.loadResByURL(json)
			let skeData = await loadSys.loadResByURL(skeJson) 
			component.armatureName = "armatureName"
			component.animator = AnimationSystem.GetAnimationDisplayWithData(skeData,textrueData,pngData,component.armatureName)
			component.animator.scaleX = component.animationScale
			component.animator.scaleY = component.animationScale
			return new Promise<AnimationComponent>((resolve,reject)=>{resolve(component)})
		}
	}
	// public pngOver(data:any)
	// {

	// }
	// public jsonOver(data:any)
	// {

	// }
	// public skeOver(data:any)
	// {

	// }
}