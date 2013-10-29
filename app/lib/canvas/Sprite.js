/**
 * @constructor
 */
var Sprite = function(){
	this.lines=[];
		/**
	 set fill colour and opacity
	 @public
	 @alias beginFill
	 @memberOf Sprite
	  @param {String} color hex colour
	 @param {Number} opacity 0 to 1
	 */
	this.beginFill=function(color,opacity)
	{
		if(!this.style)this.build();
		this.style.backgroundColor(color);
		if(opacity)this.style.opacity(opacity);
	};
	/**
	 draw a circle
	 @public
	 @alias drawCircle
	 @memberOf Sprite
	  @param {Number} x x point
	 @param {Number} y y point
	 @param {Number} r radius
	 */
	this.drawCircle=function(x, y, r)
	{
		this.type="CIRCLE";
		this.style.x(x);
		this.style.y(y);
		this.style.radius(r);
		this.style.width(r * 2);
		this.style.height(r * 2);
	};
	/**
	 draw a rectangle
	 @public
	 @alias drawRect
	 @memberOf Sprite
	  @param {Number} x x point
	 @param {Number} y y point
	 @param {Number} w width provide the width
	 @param {Number} h height provide the height
	 */
	this.drawRect=function(x, y, w,h)
	{
		this.type=CanvasRenderer.types.RECT;
		this.style.x(x);
		this.style.y(y);
		this.style.width(w);
		this.style.height(h);
	};
	/**
	 start drawing lines
	 @public
	 @alias moveTo
	 @memberOf Sprite
	  @param {Number} x x point
	 @param {Number} y y point
	 */
	this.moveTo=function(x,y)
	{
		if(!this.style)this.build();
		this.type="LINE";
		this.style.x(x);
		this.style.y(y);
		this.lines=[];
		console.log(this.style.backgroundColor());
	};
	/**
	 draw a lines
	 @public
	 @alias lineTo
	 @memberOf Sprite
	  @param {Number} x x point
	 @param {Number} y y point
	 */
	this.lineTo=function(x,y)
	{
		this.lines.push({x:x,y:y});
	};
};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	
	
})();
