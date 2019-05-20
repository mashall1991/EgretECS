class AnimationComponent  extends egret.Sprite implements IComponent{
	readonly instanceId:number = IdGenerator.GenerateInstanceId()
	
	public animationScale:number
	
	public type:AnimationType = AnimationType.ImageSequenceAnimation
	public get animator()
	{
		if(this.type == AnimationType.DragonBoneAnimation)
			return this.animInstance as dragonBones.EgretArmatureDisplay
		if(this.type == AnimationType.ImageSequenceAnimation)
			return this.animInstance as egret.MovieClip
	}
	public set animator(animator:any)
	{
		this.animInstance = animator
	}

	public name:string = ""
	/**动画播放实例 */
	private 	animInstance:any
	public 		defaultName:string 

	// /**加载标志 */
	// public 		pngFlag:boolean
	// public 		jsonFlag:boolean
	// //龙骨数据 如果是序列帧动画 此属性为空
	// public 		skeFlag:boolean

	// /**加载后的数据 */
	// public 		pngData:any
	// public 		jsonData:any
	// public 		skeData:any

	/**播放完毕自动移除 */
	public 		autoRemove = false

	/**是否循环播放 */
	public 		loop = false
	public 		armatureName:string


}