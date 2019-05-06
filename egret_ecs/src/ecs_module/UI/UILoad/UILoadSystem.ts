class UILoadSystem implements ISystem,RES.PromiseTaskReporter {
	public constructor() {
	}
	public execute()
	{
		console.log("UIloadSystem executed.")
		World.shareInstance.createEntity(UILoadEntity)
	}

	public async loadResource(group)
	{
		const isLoaded = RES.isGroupLoaded(group)
		console.log("Is group :"+group +" loaded? "+isLoaded)
		if((!isLoaded)){
			let loadingView = this.createLoadingView()
			Main.STAGE.addChild(loadingView);
			await RES.loadGroup(group, 0, this);
			let uILoadEntity = World.shareInstance.getEntity(UILoadEntity)
			uILoadEntity.removeComponent(loadingView)
			Main.STAGE.removeChild(loadingView);
        }	
	}
	onProgress(current: number, total: number): void {
		let uILoadEntity = World.shareInstance.getEntity(UILoadEntity)
		let loadingView = uILoadEntity.getComponent(LoadingUI)
		loadingView.textField.text = `Loading ` + "("+ Math.floor(current / total * 100) + " %)..";
    }
	private createLoadingView():any
	{
		let uILoadEntity = World.shareInstance.getEntity(UILoadEntity)
		let loadingView = uILoadEntity.addComponent(LoadingUI)
		if(!loadingView.maskBg)
		{
			loadingView.maskBg = new egret.Sprite();
			loadingView.maskBg.touchEnabled = true;
			loadingView.maskBg.graphics.beginFill(1,0.7);
			loadingView.maskBg.graphics.drawRect(0, 0, StageSystem.stageWidth, StageSystem.stageHeight);
			loadingView.maskBg.graphics.endFill();
			loadingView.addChild(loadingView.maskBg)
		}
		loadingView.textField = new egret.TextField();
		loadingView.addChild(loadingView.textField);
		loadingView.textField.y = StageSystem.stageHeight / 2;
		loadingView.textField.x = StageSystem.stageWidth / 2;
		loadingView.textField.width = 480;
		loadingView.textField.height = 100;
		loadingView.textField.anchorOffsetX = 240
		loadingView.textField.anchorOffsetY = 50
		loadingView.textField.textAlign = "center";
		loadingView.textField.text = `Loading ` + "(0 %)..";
		return loadingView
	}
}