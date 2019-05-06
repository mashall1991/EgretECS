class World {
	private constructor() {
	}
	private  static readonly _instance:World = new World()
	public static get shareInstance()
	{
		return this._instance
	}	

	/**
	 * 所有实体
	 */
	public entities:Object = {}
	/**
	 * 所有系统
	 */
	public systems:Object = {}
	
	/**
	 * 统一调度update的系统
	 */
	public updateSystems:IUpdateSystem[] = []


	/**过滤具有某些组件的实体
	 * @param components 类数组 eg. [A,B,C] A,B,C为继承自Component的类名
	 * @return 实体数组
	 */
	public entityFilter<T>(components:(new ()=>T)[]):any[]
	{
		var compNames = []
		var entities = []
		for (let i = 0 ; i < components.length;i++)
		{
			let comp = components[i]
			let str = ClassSystem.getClassName(comp)
			compNames.push(str)
		}
		for(var k in this.entities)
		{
			let containAllComponents = true
			let en:Entity = this.entities[k]
			for(let i = 0 ; i < compNames.length; i ++)
			{
				let componentName = compNames[i]
				let comp = en.getComponentByName(componentName)
				containAllComponents = !(comp == null)
			}
			if(containAllComponents)
				entities.push(en)
		}
		return entities
	}
	public getEntity<T>(entity:(new ()=>T)):T
	{
		return this.entities[ClassSystem.getClassName(entity)]
	}
	/**
	 * 创建实体
	 */
	public createEntity<T extends IComponent>(entity:new()=>T):T
	{
		
		let e = new entity()
		this.entities[ClassSystem.getInstanceClassName(e)] = e
		return e
	}
	/**
	 * 创建系统
	 */
	public createSystem<T extends ISystem>(sys:new()=>T):T
	{	
		let sysName = ClassSystem.getClassName(sys)
		let system = this.systems[sysName]
		if(system == null)
		{
			system = new sys()
			this.systems[sysName] = system
			let types = sys.prototype["__types__"]
			for(var k in types)
			{
				let systemType = types[k]
				if(systemType == "IUpdateSystem")
					this.updateSystems.push(system)
			}
		}
		return system
	}
	/**
	 * 获取System
	 */
	public getSystem<T extends ISystem>(sys:new()=>T):T
	{
		return this.systems[ClassSystem.getClassName(sys)]
	}
}
