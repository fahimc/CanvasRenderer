/**
 * @constructor
 */
var TextField = function() {
	/** @property {String} type this sets the type */
	this.type = CanvasRenderer.types.TEXT;
	this.strokeText = "";
	this._color = "#000";
	/**
	 set the text
	 @public
	 @param {String} value provide the text
	 */
	this.text = function(value) {

		this.strokeText = value;
		CanvasRenderer.render();
	};
	/**
	 set the colour for the text
	 @public
	 @param {String} value provide the hex value
	 */
	this.color = function(value) {
		if (value) {
			this._color = value;
			CanvasRenderer.render();
		}
		return this._color;
	};
	
};
(function() {
	TextField.prototype = new CanvasDisplayObject();
	TextField.prototype.constructor = CanvasDisplayObject;

})();
