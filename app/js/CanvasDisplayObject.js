var CanvasDisplayObject=function(){
	this.children=[];
	this.update=false;
	this.style=null;
	this.id="";
	this.uid=null;
    this.canvasUID=null;
	this.type=CanvasRenderer.types.RECT;
};
(function()
{
	var _ = CanvasDisplayObject.prototype;
	
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.style=new CanvasStyle();
		this.style.uid =  CanvasRenderer.uid++;
		
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
	_.appendChild=function(displayObject)
	{
		displayObject.style.parent=this;
		displayObject.canvasUID=this.canvasUID;
		this.children.push(displayObject);
		CanvasRenderer.getCanvasByUID(this.canvasUID).appendChild(displayObject);
	};
})();
