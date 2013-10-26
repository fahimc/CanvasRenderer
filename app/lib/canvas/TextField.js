var TextField = function(){
	this.type=CanvasRenderer.types.TEXT;
	this.strokeText="";
	this.textAlign="start";
	this._color="#000";
	this.text=function(value)
	{
		
		this.strokeText=value;
		CanvasRenderer.render();
	};
	this.color=function(value)
	{
		if(value)
		{
			this._color=value;
		CanvasRenderer.render();
		}
		return this._color;
	};
};
(function()
{
	TextField.prototype = new CanvasDisplayObject();
	TextField.prototype.constructor = CanvasDisplayObject;
	
	
	
})();
