var CanvasDisplayObject=function(){
	
};
(function()
{
	var _ = CanvasDisplayObject.prototype;
	_.children=[];
	_.update=false;
	_.style=null;
	_.id="";
	_.uid=null;
	_.canvasUID=null;
	_.type=CanvasRenderer.types.RECT;
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.style=new CanvasStyle();
	};
	_.setStyle=function()
	{
		
	};
	_.arrange=function()
	{
		
	};
	_.hasUpdates=function()
	{
		var has= this.style.check();
		if(has)
		{
			for(var a=0;a<this.children.length;a++)
			{
				this.children[a].style.hasUpdates=true;
			}
		}
			return has;
	};
	_.updated=function()
	{
		
	}
	_.addChild=function(displayObject)
	{
		displayObject.style.parent=this;
		displayObject.canvasUID=this.canvasUID;
		this.children.push(displayObject);
		CanvasRenderer.getCanvasByUID(this.canvasUID).addChild(displayObject);
	};
})();
