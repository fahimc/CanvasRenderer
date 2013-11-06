/**
 * @constructor
 */
var CanvasDisplayObject=function(){
	/** @property {Array} children array of children */
	this.children=[];
	/** @property {Boolean} update check if this object has been updated */	
	this.update=false;
	/** @property {CanvasStyle} the style object */	
	this.style=null;
	/** @property {String} id style set an id for the object */	
	this.id="";
	/** @property {Number} uid a unique reference for this object */	
	this.uid=null;
	/** @property {Number} canvasUID a unique reference for the parent canvas */	
    this.canvasUID=null;
	/** @property {String} type the type */	
	this.type=CanvasRenderer.types.RECT;
	/** @property {String}  state the state of the object*/	
	this.state="";
};
(function()
{
	var _ = CanvasDisplayObject.prototype;
	/**
	 build the CanvasDisplayObject
	 @public
	 @alias build
	 @memberOf CanvasDisplayObject
	 */
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.style=new CanvasStyle();
		this.style.uid =  CanvasRenderer.uid++;
		
	};
	/**
	 check if any children has been updated
	 @public
	 @alias hasUpdates
	 @memberOf CanvasDisplayObject
	 @return {Boolean}
	 */
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
	/**
	 adds an object to the CanvasDisplayObject
	 @public
	 @alias appendChild
	 @memberOf CanvasDisplayObject
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.appendChild=function(displayObject)
	{
		displayObject.style.parent=this;
		this.children.push(displayObject);
		if(CanvasRenderer.getCanvasByUID(this.canvasUID))
		{
			displayObject.canvasUID=this.canvasUID;
			CanvasRenderer.getCanvasByUID(this.canvasUID).appendChild(displayObject);			
		}
	};
	/**
	 removes an object to the CanvasDisplayObject
	 @public
	 @alias removeChild
	 @memberOf CanvasDisplayObject
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.removeChild=function(displayObject)
	{
		for (var a = 0; a < this.children.length; a++) {
			var d = this.children[a];
			if (d.uid == displayObject.uid)
			{
				this.children.splice(a,1);
				
				
			}
		}
		CanvasRenderer.getCanvasByUID(this.canvasUID).removeChild(displayObject);
	};
	/**
	 check if the CanvasDisplayObject is within the points provided
	 @public
	 @alias hitTestPoint
	 @memberOf CanvasDisplayObject
	 @param {Number} x provide the x value
	 @param {Number} y provide the y value
	 */
	_.hitTestPoint=function(x,y)
	{
		if(this.style.x()<=x && x<=this.style.x()+this.style.width() && this.style.y()<=y && y<=this.style.y()+this.style.height())return true;
		return false;
	};
})();
