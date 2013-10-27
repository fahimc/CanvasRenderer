<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Source: CanvasRenderer.js</title>

    <script src="scripts/prettify/prettify.js"> </script>
    <script src="scripts/prettify/lang-css.js"> </script>
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/prettify-tomorrow.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc-default.css">
</head>

<body>

<div id="main">

# Source: CanvasRenderer.js

    <section>
        <article>

    /** @name  CanvasRenderer
     *@namespace
     *  */
    var CanvasRenderer = {
    	/**
    	 * @property {Object} types types of elements
    	 * @property {String} types.RECT defines a RECT display object
    	 * @property {String} types.CIRCLE defines a CIRCLE display object
    	 * @property {String} types.TEXT defines a TEXT display object
    	 * @property {String} types.IMAGE defines a IMAGE display object
    	 */
    	types : {
    		RECT : "RECT",
    		CIRCLE : "CIRCLE",
    		TEXT : "TEXT",
    		IMAGE : "IMAGE"
    	},
    	/** @property {Number} frameRate this sets the framerate*/
    	frameRate : 35,
    	timer : null,
    	children : [],
    	callbacks : [],
    	uid : 0,
    	start : function() {

    	},
    	/** This will render the canvas
    	 @public
    	 @alias render
    	 @memberOf CanvasRenderer
    	 */
    	render : function() {
    		for (var a = 0; a &lt; this.children.length; a++) {
    			this.checkChildren(this.children[a]);
    		}
    	},
    	checkChildren : function(canvas) {
    		for (var b = 0; b &lt; canvas.children.length; b++) {
    			var cleared = false;
    			var displayObject = canvas.children[b];
    			if (displayObject.hasUpdates()) {
    				if (!cleared)
    					canvas.getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    				cleared = true;

    				//update all children
    				displayObject.style.updated();
    				this.updateAll(canvas);
    			}
    		}
    	},
    	updateAll : function(canvas) {
    		for (var c = 0; c &lt; canvas.children.length; c++) {
    			var displayObject = canvas.children[c];

    			switch(displayObject.type) {
    				case this.types.RECT:
    					this.drawRect(canvas, displayObject);
    					break;
    				case this.types.CIRCLE:
    					this.drawCircle(canvas, displayObject);
    					break;
    				case this.types.TEXT:
    					this.drawText(canvas, displayObject);
    					break;
    				case this.types.IMAGE:
    					this.drawImage(canvas, displayObject);
    					break;
    			}
    		}
    		this.dispatch();
    	},
    	stop : function() {
    		clearInterval(this.timer);
    		this.timer = null;
    	},
    	dispatch : function() {
    		for (var name in this.callbacks) {
    			this.callbacks[name]();
    		}
    	},
    	addCallback : function(name, func) {
    		this.callbacks[name] = func;
    	},
    	hasCallback : function(name) {
    		return this.callbacks[name] ? true : false;
    	},
    	removeCallback : function(name) {
    		this.callbacks[name] = null;
    		delete this.callbacks[name];
    	},
    	/** get an object by its uid
    	 @public
    	 @alias getDisplayByUID
    	 @memberOf CanvasRenderer
    	 @return {CanvasDisplayObject} 
    	 */
    	getDisplayByUID : function(uid) {
    		for (var a = 0; a &lt; this.children.length; a++) {
    			var canvas = this.children[a];
    			for (var b = 0; b &lt; canvas.children.length; b++) {
    				if (canvas.children[b].uid == uid)
    					return canvas.children[b];
    			}
    		}
    		return null;
    	},
    	/** get a canvas wrapper by its uid
    	 @public
    	 @alias getCanvasByUID
    	 @memberOf CanvasRenderer
    	 @return {Canvas} 
    	 */
    	getCanvasByUID : function(uid) {
    		for (var a = 0; a &lt; this.children.length; a++) {
    			var canvas = this.children[a];
    			if (canvas.uid == uid)
    				return canvas;
    		}
    		return null;
    	},
    	drawRect : function(canvas, d) {
    		var context = canvas.getContext('2d');
    		context.beginPath();
    		context.rect(d.style.x(), d.style.y(), d.style.width(), d.style.height());
    		var rgb = this.hexToRgb(d.style.backgroundColor());
    		context.fillStyle = rgb.replace('[x]', d.style.opacity());
    		context.fill();
    		context.lineWidth = d.style.lineWidth();
    		rgb = this.hexToRgb(d.style.strokeStyle());
    		context.strokeStyle = rgb.replace('[x]', d.style.opacity());
    		context.stroke();
    	},
    	drawCircle : function(canvas, d) {
    		var context = canvas.getContext('2d');
    		context.beginPath();
    		var radius = d.style.radius();
    		var centerX = d.style.x() + radius;
    		var centerY = d.style.y() + radius;
    		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    		var rgb = this.hexToRgb(d.style.backgroundColor());
    		context.fillStyle = rgb.replace('[x]', d.style.opacity());
    		context.fill();
    		context.lineWidth = d.style.lineWidth();
    		rgb = this.hexToRgb(d.style.strokeStyle());
    		context.strokeStyle = rgb.replace('[x]', d.style.opacity());
    		context.stroke();
    	},
    	drawText : function(canvas, d) {
    		var context = canvas.getContext('2d');
    		var rgb = this.hexToRgb(d.color());
    		context.fillStyle = rgb.replace('[x]', d.style.opacity());
    		context.textBaseline = d.style.textBaseline();
    		context.font = d.style.font();
    		context.lineWidth = d.style.lineWidth();
    		context.textAlign = d.style.textAlign();
    		context.fillText(d.strokeText, d.style.x(), d.style.y());
    		context.stroke();
    	},
    	drawImage : function(canvas, d) {
    		var context = canvas.getContext('2d');
    		if (d.clipping != null) {
    			context.drawImage(d.img, d.clipping.x, d.clipping.y, d.clipping.w, d.clipping.h, d.style.x(), d.style.y(), d.style.width(), d.style.height());
    		} else {
    			context.drawImage(d.img, d.style.x(), d.style.y(), d.style.width(), d.style.height());
    		}
    	},
    	hexToRgb : function(hex) {
    		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    			return r + r + g + g + b + b;
    		});
    		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    		if (!result)
    			return hex;
    		var data = {
    			r : parseInt(result[1], 16),
    			g : parseInt(result[2], 16),
    			b : parseInt(result[3], 16)
    		}
    		return 'rgba(' + data.r + ',' + data.g + ',' + data.b + ',' + '[x])';
    	}
    };

        </article>
    </section>

</div>

<nav>

## [Index](index.html)

### Classes

*   [Canvas](Canvas.html)
*   [CanvasDisplayObject](CanvasDisplayObject.html)
*   [CanvasImage](CanvasImage.html)
*   [CanvasStyle](CanvasStyle.html)
*   [Sprite](Sprite.html)
*   [TextField](TextField.html)

### Namespaces

*   [CanvasRenderer](CanvasRenderer.html)
*   [CanvasTween](CanvasTween.html)
</nav>

<footer>
    Documentation generated by [JSDoc 3.2.0](https://github.com/jsdoc3/jsdoc) on Sun Oct 27 2013 12:26:52 GMT-0000 (GMT)
</footer>

<script> prettyPrint(); </script>
<script src="scripts/linenumber.js"> </script>
</body>
</html>