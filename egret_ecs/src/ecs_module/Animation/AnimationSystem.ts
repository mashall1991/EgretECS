
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

	public loadAtlasRes(name:string)
	{
		
	}
	public play()
	{

	}
	public pause()
	{

	}

}