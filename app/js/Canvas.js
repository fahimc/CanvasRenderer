var Canvas=function(){};
(function()
{
	var _ = Canvas.prototype;
	
	_.element=null;
	_.children=[];
	_.uid=null;
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.element = document.createElement("CANVAS");
		CanvasRenderer.children.push(this);
		CanvasRenderer.start();
	};
	_.width=function(value)
	{
		if(value!=undefined)this.element.width = value;
		return this.element.width ;
	};
	_.height=function(value)
	{
		if(value!=undefined)this.element.height = value;
		return this.element.height ;
	};
	_.getContext =function(value)
	{
		return this.element.getContext(value); 
	};
	_.addChild=function(displayObject)
	{
		displayObject.canvasUID=this.uid;
		this.children.push(displayObject);
		CanvasRenderer.render();
	};
})();
