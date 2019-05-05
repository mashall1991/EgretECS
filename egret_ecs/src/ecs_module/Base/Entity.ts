class Entity implements IComponent{
	readonly instanceId:number = IdGenerator.GenerateInstanceId()
	
	private Entity(){}
	public components:Object = {}

	public addComponent<T extends Component>(component:new ()=>T):T
	{
		let cp = new component()
		let type = ClassUtil.getInstanceClassName(cp)
		let c = this.components[type]
		if(c == null)
		{
			this.components[type] = cp
		}
		return this.components[type]
	}

	public addComponent_<T extends Component>(component:T):T
	{
		let type = ClassUtil.getInstanceClassName(component)
		let c = this.components[type]
		if(c == null)
		{
			this.components[type] = component
			return component
		}
		return c
	}

	public removeComponent<T extends Component>(component:T)
	{
		let type = ClassUtil.getInstanceClassName(component)
		if(this.components[type])
		{
			delete this.components[type]
		}
		else
		{
			console.warn("Entity:"+ ClassUtil.getInstanceClassName(this) + " does not contain "+ type + " .")
		}
	}

	public getComponent_<T extends Component>(t:T):T
	{
		let type = ClassUtil.getInstanceClassName(t)
		let c = this.components[type]
		if(c == null)
		{
			console.warn("Entity:"+ ClassUtil.getInstanceClassName(this) + " does not contain "+ type + " .")
		}
		return c 
	}
	public getComponentByName<T extends Component>(name:string):T
	{
		let c = this.components[name]
		if(c == null)
		{
			console.warn("Entity:"+ ClassUtil.getInstanceClassName(this) + " does not contain "+ name + " .")
		}
		return c 
	}
	public getComponent<T extends Component>(cl:new()=>T):T
	{
		let name = ClassUtil.getClassName(cl)
		let c = this.components[name]
		if(c == null)
		{
			console.warn("Entity:"+ ClassUtil.getInstanceClassName(this) + " does not contain "+ name + " .")
		}
		return c
	}
	public getComponents():any[]
	{
		let array = []
		for (var k in this.components)
		{
			let c = this.components[k]
			array.push(c)
		}
		return array
	}
	
}	