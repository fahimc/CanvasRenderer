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
		this.lines.push({type:CanvasRenderer.lineType.LINE,x:x,y:y});
	};
	/**
	 draw a quadratic curved line
	 @public
	 @alias quadraticCurveTo
	 @memberOf Sprite
	  @param {Number} cpx The x-coordinate of the Bézier control point
	  @param {Number} cpy The y-coordinate of the Bézier control point
	  @param {Number} x end x point
	 @param {Number} y end y point
	 */
	this.quadraticCurveTo=function(cpx,cpy,x,y)
	{
		this.lines.push({type:CanvasRenderer.lineType.CURVE,x:x,y:y,cpx:cpx,cpy:cpy});
	};
	/**
	 draw a bezier curved line
	 @public
	 @alias bezierCurveTo
	 @memberOf Sprite
	  @param {Number} cp1x The x-coordinate of the first Bézier control point
	  @param {Number} cp1y The y-coordinate of the first Bézier control point
	   @param {Number} cp2x The x-coordinate of the second Bézier control point
	  @param {Number} cp2y The y-coordinate of the second Bézier control point
	  @param {Number} x end x point
	 @param {Number} y end y point
	 */
	this.bezierCurveTo=function(cp1x,cp1y,cp2x,cp2y,x,y)
	{
		this.lines.push({type:CanvasRenderer.lineType.BEZIER_CURVE,x:x,y:y,cp1x:cp1x,cp1y:cp1y,cp2x:cp2x,cp2y:cp2y});
	};
};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	
	
})();
