
/**
 * 序列帧动画
 */
class AnimationSystem implements ISystem {
	public execute()
	{
		World.shareInstance.createEntity(AnimationEntity)
		let poolsys = World.shareInstance.getSystem(PoolSystem)		
		poolsys.createPool(AnimationComponent)
	}
	private getEntity():AnimationEntity
	{
		return World.shareInstance.getEntity(AnimationEntity)
	}

	public async createAnimation(name:string,type:AnimationType,scale = 1):Promise<AnimationComponent>
	{
		let ac = World.shareInstance.getSystem(PoolSystem).spawn(AnimationComponent) 
		ac.type = type
		ac.name = name
		ac.animationScale = scale
		let animationLoadSys = new AnimationLoader()
		await animationLoadSys.loadAnimation(ac)
		return new Promise<AnimationComponent>((resolve,reject)=>{resolve(ac)})
	}

	public play(anim:AnimationComponent,action:string)
	{
		if(anim.type == AnimationType.DragonBoneAnimation)
		{
			let animator = anim.animator as dragonBones.EgretArmatureDisplay
			animator.animation.play(action)
		}
		else if(anim.type == AnimationType.ImageSequenceAnimation)
		{
			let animator = anim.animator as egret.MovieClip
			animator.play(anim.loop?-1:1)
		}
	}
	public pause(anim:AnimationComponent)
	{
		if(anim.type == AnimationType.DragonBoneAnimation)
		{
			let animator = anim.animator as dragonBones.EgretArmatureDisplay
			animator.animation.stop()
		}
		else if(anim.type == AnimationType.ImageSequenceAnimation)
		{
			let animator = anim.animator as egret.MovieClip
			animator.stop()
		}
	}
	public clearAnimation(anim:AnimationComponent)
	{
		UIManageSystem.removeDisplay(anim)
		anim.name = ""
		anim.animator = null
		anim.autoRemove = false
		anim.loop = false
		anim.defaultName = ""
	}	
	public static GetAnimationDisplay(name:string):dragonBones.EgretArmatureDisplay{

        var dragonbonesData = RES.getRes(name +"_ske_json" );
        var textureData = RES.getRes( name + "_tex_json" );
        var texture = RES.getRes(name + "_tex_png" );
        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonbonesFactory.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlasData(dragonbonesFactory.parseTextureAtlasData(textureData,texture));  
        var armatureDisplay = dragonbonesFactory.buildArmatureDisplay("armatureName"); 
        return armatureDisplay;
    }
    public static GetAnimationDisplayWithData(dragonBonesData:any,textureData:any,texture:any,armatureName:string = "armatureName"):dragonBones.EgretArmatureDisplay
    {
        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonbonesFactory.parseDragonBonesData(dragonBonesData));
        dragonbonesFactory.addTextureAtlasData(dragonbonesFactory.parseTextureAtlasData(textureData,texture));  
        var armatureDisplay = dragonbonesFactory.buildArmatureDisplay(armatureName); 
        return armatureDisplay;
    }
}