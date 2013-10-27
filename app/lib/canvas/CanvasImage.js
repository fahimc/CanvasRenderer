/**
 * @constructor
 */
var CanvasImage = function() {
		/** @property {String} type this sets the type*/
	this.type = CanvasRenderer.types.IMAGE;
	this.img = null;
	this.clipping=null;
		/**
	 set the image source
	 @public
	  @param {String} src string of the source
	 @return {String} 
	 */
	this.src = function(src) {
		if (!this.style && src)
			this.build();
		if (src != undefined) {
			this.img = new Image();
			this.img.src = src;
		}
		return this.img.src;
	};
		/**
	 create t clipping for the image
	 @public
	  @param {Number} x x position
	  @param {Number} y y position
	  @param {Number} w width of the crop
	  @param {Number} h height of the crop
	 */
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
