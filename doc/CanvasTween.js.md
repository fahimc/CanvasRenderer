<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Source: CanvasTween.js</title>

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

# Source: CanvasTween.js

    <section>
        <article>

    /** @name  CanvasTween
     *@namespace
     *  */
    var CanvasTween = {
    	index : 0,
    	items : [],
    	timers : [],
    	render : null,
    	/**
    	 * @property {Object} ease types of eases available
    	 * @property {String} ease.easeIn defines an ease in 
    	 * @property {String} ease.easeOut defines an ease out
    	 * @property {String} ease.strongEaseOut defines an strong ease out 
    	 * @property {String} ease.easeBack defines an ease back 
    	 */
    	ease : {
    		easeIn : "ease-in",
    		easeOut : "ease-out",
    		strongEaseOut : "strong-ease-out",
    		easeBack : "ease-back",
    		easeInOut : "ease-in-out"
    	},
    	/** animate a canvas object
    	 @public
    	 @alias to
    	 @memberOf CanvasTween
    	  @param {CanvasDisplayObject} obj provide a CanvasDisplayObject
    	  @param {Number} duration provide a duration from 0 to 1
    	  @param {Object} options provide style attributes and other attributes
    	  @property {Function} options.onComplete provide a callback
    	  @property {Number} options.delay provide a delay from 0 to 1
    	  @property {String} options.ease provide an ease. Check CanvasTween.ease object for types that are available;
    	 */
    	to : function(obj, duration, options) {
    		var root = this;

    		if (options.delay) {
    			this.timers[this.index] = setTimeout(function() {
    				root.addItem(obj, duration, options);
    			}, options.delay * 1000);
    		} else {
    			this.addItem(obj, duration, options);

    		}

    	},
    	addItem : function(obj, duration, options) {
    		this.items.push({
    			obj : obj,
    			d : duration,
    			options : options
    		});
    		this.index++;
    		this.addRender();
    	},
    	addRender : function() {
    		var root = this;
    		if (!this.render) {
    			this.render = setInterval(function() {
    				root.calculateMovement();
    			}, CanvasRenderer.frameRate);
    		}
    	},
    	calculateMovement : function() {
    		for (var itemIndex = 0; itemIndex &lt; this.items.length; itemIndex++) {
    			var total = 0;
    			var count = 0;

    			var elem = this.items[itemIndex].obj;
    			for (var name in this.items[itemIndex].options) {
    				//ignore onComplete and delay
    				var option = this.items[itemIndex].options[name];
    				var ease = this.items[itemIndex].options['ease'];
    				if (name != "onComplete" && name != "delay" && name != "ease") {
    					if (this.items[itemIndex].options[name].originalVal == undefined) {
    						this.items[itemIndex].options[name] = {
    							value : option,
    							end : false,
    							currentFrame : 0,
    							originalVal : null
    						};
    						option = this.items[itemIndex].options[name];
    					}

    					total++;
    					var prop = String(option.value).replace("px", "");
    					var currentValue = elem.style[name]();

    					if (option.originalVal == null)
    						option.originalVal = currentValue;

    					var t = option.currentFrame / CanvasRenderer.frameRate;

    					if (option.currentFrame &lt;= CanvasRenderer.frameRate) {

    						var factor = this.getFactor(ease, t, option.originalVal, (option.value - option.originalVal), 1);

    						var newVal = option.originalVal + (option.value - option.originalVal) * factor;

    						this.items[itemIndex].obj.style[name](newVal);
    						option.currentFrame++;

    					} else {

    						option.end = true;
    						count++;
    					}
    				}

    			}
    			if (count == total) {
    				//	console.log("done");
    				if (this.items[itemIndex].options.onComplete)
    					this.items[itemIndex].options.onComplete();
    				this.removeItem(itemIndex);
    			}
    		}

    	},
    	getFactor : function(ease, t, b, c, d) {
    		switch(ease) {
    			case this.ease.easeIn:
    				return this.easeIn(t, d);
    				break;
    			case this.ease.strongEaseOut:
    				return this.strongEaseOut(t, d);
    				break;
    			case this.ease.easeOut:
    				return this.easeOut(t, b, c, d, 5);
    				break;
    			case this.ease.easeBack:
    				return this.easeOut(t, b, c, d, 5);
    				break;
    			case this.ease.easeInOut:
    				return this.easeInOut(t, b, c, d, 5);
    				break;
    			default:
    				return this.noEasing(t, d);
    				break;
    		}
    	},
    	noEasing : function(t, d) {
    		return t / d;
    	},
    	easeIn : function(t, d) {
    		return Math.pow(t / d, 5);
    	},
    	strongEaseOut : function(t, d) {
    		return 1 - Math.pow(1 - (t / d), 5);
    	},
    	easeOut : function(t, b, c, d, v) {
    		return 1 - Math.pow(1 - (t / d), v);
    	},
    	easeBack : function(t, b, c, d, v) {
    		return c * (( t = t / d - 1) * t * ((v + 1) * t + v) + 1) + b;
    	},
    	easeInOut : function(t, b, c, d, v) {
    		// if ellapsed time is greater than half of the duration, easeOut
    		if (t > (d / 2))
    			return this.easeOut(t, b, c, d,v);
    		// otherwise, easein
    		return this.easeIn(t, b, c, d);
    	},
    	removeItem : function(index) {
    		this.items[index] = null;
    		this.items.splice(index, 1);

    		if (this.items.length == 0)
    			this.stopAll();
    	},
    	stopAll : function() {
    		clearInterval(this.render);
    		this.render = null;
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