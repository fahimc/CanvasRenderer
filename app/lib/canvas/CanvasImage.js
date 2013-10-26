var CanvasImage = function() {
	this.type = CanvasRenderer.types.IMAGE;
	this.img = null;
	this.clipping=null;
	this.src = function(src) {
		if (!this.style && src)
			this.build();
		if (src != undefined) {
			this.img = new Image();
			this.img.src = src;
		}
		return this.img.src;
	};
	this.clip=function(x,y,w,h)
	{
		if(x==null)this.clipping=null;
		else
		this.clipping={x:x,y:y,w:w,h:h};
		CanvasRenderer.render();		
	}
};
(function() {
	CanvasImage.prototype = new CanvasDisplayObject();
	CanvasImage.prototype.constructor = CanvasDisplayObject;

})();
