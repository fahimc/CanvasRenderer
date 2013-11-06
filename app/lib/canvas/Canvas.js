/**
 * @constructor
 */
var Canvas = function() {
	this.element = null;
	this.children = [];
	this.uid = null;
};
(function() {
	/** @scope Canvas */
	var _ = Canvas.prototype;

	/**
	 build the Canvas
	 @public
	 @alias Canvas.build
	 @memberOf Canvas
	 */
	_.build = function() {
		this.uid = CanvasRenderer.uid++;
		this.element = document.createElement("CANVAS");
		CanvasRenderer.children.push(this);
		CanvasRenderer.start();
	};
	/**
	 set the width of the canvas
	 @public
	 @memberOf Canvas
	 @alias Canvas.width
	 @param {number} value width
	 @returns {Number}
	 */
	_.width = function(value) {
		if (value != undefined)
			this.element.width = value;
		return this.element.width;
	};
	/**
	 set the height of the canvas
	 @public
	 @alias Canvas.height
	 @memberOf Canvas
	 @param {number} value height
	 @returns {Number}
	 */
	_.height = function(value) {
		if (value != undefined)
			this.element.height = value;
		return this.element.height;
	};
	/**
	 returns the context of the canvas
	 @public
	 @alias Canvas.getContext
	 @memberOf Canvas
	 @param {string} value '2d' or '3d'
	 @returns {Context}
	 */
	_.getContext = function(value) {
		return this.element.getContext(value);
	};
	/**
	 returns a child element by its uid
	 @public
	 @alias Canvas.getChildByUID
	 @memberOf Canvas
	 @param {number} uid this is the uid of an object
	 @returns {CanvasDisplayObject}
	 */
	_.getChildByUID = function(uid) {
		for (var a = 0; a < this.children.length; a++) {
			var d = this.children[a];
			if (d.uid == uid)
				return d;
		}
		return null;
	};
	/**
	 adds an object to the canvas
	 @public
	 @alias Canvas.appendChild
	 @memberOf Canvas
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.appendChild = function(displayObject) {

		displayObject.canvasUID = this.uid;
		this.children.push(displayObject);

		//add object children
		for (var a = 0; a < displayObject.children.length; a++) {
			if (displayObject.children[a].canvasUID == null) {
				displayObject.children[a].canvasUID = this.uid;
				this.children.push(displayObject.children[a]);
			}
		}
		CanvasRenderer.render();
	};
	/**
	 removes an object to the canvas
	 @public
	 @alias Canvas.removeChild
	 @memberOf Canvas
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.removeChild = function(displayObject) {
		for (var a = 0; a < this.children.length; a++) {
			var d = this.children[a];
			if (d.uid == displayObject.uid) {
				displayObject.canvasUID=null;
				this.children.splice(a, 1);
				return;

			}
		}
	};
})();
