/**
 * @constructor
 */
var Sprite = function(){
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
};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	
	
})();
