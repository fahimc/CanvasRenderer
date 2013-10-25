var Sprite = function(){};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	var _ = Sprite.prototype;
	
	_.beginFill=function(color)
	{
		this.style.backgroundColor(color);
	};
	_.drawCircle=function(x, y, r)
	{
		this.type="CIRCLE";
		this.style.x(x);
		this.style.y(y);
		this.style.radius(r);
		this.style.width(r);
		this.style.height(r);
	};
	_.drawRect=function(x, y, w,h)
	{
		this.type="RECT";
		this.style.x(x);
		this.style.y(y);
		this.style.width(w);
		this.style.height(h);
	};
})();
