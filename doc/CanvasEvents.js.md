<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Source: CanvasEvents.js</title>

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

# Source: CanvasEvents.js

    <section>
        <article>

    (function()
    {
    	var _ = Canvas.prototype;

    	_.listeners=[];
    	_.dispatchToListeners=function(event,eventName)
    	{
    		if(!this.listeners[eventName])return;
    		//get mouse pos
    		var x = event.pageX - this.element.offsetLeft;
    		var y = event.pageY - this.element.offsetTop;
    		//loop through the callbacks and call them
    		for(var uid in this.listeners[eventName].callbacks)
    		{
    			var d =this.getChildByUID(uid);
    			var valid =false;
    			switch(eventName)
    			{
    				case 'click':
    				case 'mousedown':
    				case 'mouseup':
    				case 'mousemove':
    				if(!d||d.hitTestPoint(x,y))valid=true;
    				break;
    				case 'mouseover':
    				if(!d||d.hitTestPoint(x,y))
    				{
    					valid=true;
    					d.state="mouseover";
    				}
    				break;
    				case 'mouseout':
    				if(!d||!d.hitTestPoint(x,y) && d.state=="mouseover")
    				{
    					d.state="";
    					valid=true;
    				}
    				break;
    			}

    			if(valid)this.listeners[eventName].callbacks[uid](event);
    		}
    	};
    	/**
    	add Event listeners to the canvas object
    	 @public
    	 @memberOf Canvas
    	 @alias Canvas.addEventListener
    	 @requires CanvasEvent
    	 @param {String} eventName the name of the event
    	 @param {Function} callback the callback function
    	 */
    	_.addEventListener=function(eventName,callback)
    	{

    		//check if canvas has this event if not create it
    		var _this = this;
    		if(!this.listeners[eventName])
    		{
    			this.listeners[eventName]={
    				event:function(event){
    					_this.dispatchToListeners(event,eventName);
    				},
    				callbacks:[]
    			};

    			canvas.element.addEventListener(eventName,canvas.listeners[eventName].event);
    		}
    		//add the new callback
    		if(this.listeners[eventName].callbacks[this.uid])return;
    		this.listeners[eventName].callbacks[this.uid]=callback;
    	};
    	/**
    	remove Event listeners to the canvas object
    	 @public
    	 @memberOf Canvas
    	  @requires CanvasEvent
    	 @alias Canvas.removeEventListener
    	 @param {String} eventName the name of the event
    	 @param {Function} callback the callback function
    	 */
    	_.removeEventListener=function(eventName,callback)
    	{

    		if(!this.listeners[eventName]||!this.listeners[eventName].callbacks[this.uid])return;
    		for(var a=0;a&lt;this.listeners[eventName].callbacks.length;a++)
    		{
    			if(this.listeners[eventName].callbacks[a]==undefined)
    			{
    				this.listeners[eventName].callbacks.splice(a,1);
    				a--;
    			}
    			if(this.listeners[eventName].callbacks[a]==callback)
    			{

    				this.listeners[eventName].callbacks.splice(a,1);
    				break;
    			}
    		}
    		//remove listener on canvas is no callbacks
    		if(this.listeners[eventName].callbacks.length==0)
    		{

    				canvas.element.removeEventListener(eventName,canvas.listeners[eventName].event);
    				this.listeners[eventName]=null;
    		}

    	};

    })();

    (function()
    {
    	var _ = CanvasDisplayObject.prototype;
    	/**
    	add Event listeners to the CanvasDisplayObject 
    	 @public
    	 @memberOf CanvasDisplayObject
    	 @alias CanvasDisplayObject.addEventListener
    	  @requires CanvasEvent
    	 @param {String} eventName the name of the event
    	 @param {Function} callback the callback function
    	 */
    	_.addEventListener=function(eventName,callback)
    	{
    		//get the canvas
    		var canvas = CanvasRenderer.getCanvasByUID(this.canvasUID);
    		//check if canvas has this event if not create it
    		if(!canvas.listeners[eventName])
    		{
    			canvas.listeners[eventName]={
    				event:function(event){
    					canvas.dispatchToListeners(event,eventName);
    				},
    				callbacks:[]
    			};

    			var eName = eventName;
    			if(eventName=="mouseover"||eventName=="mouseout")eName ="mousemove";
    			canvas.element.addEventListener(eName,canvas.listeners[eventName].event);
    		}
    		//add the new callback
    		if(canvas.listeners[eventName].callbacks[this.uid])return;
    		canvas.listeners[eventName].callbacks[this.uid]=callback;
    	};
    	/**
    	remove Event listeners to the CanvasDisplayObject 
    	 @public
    	 @memberOf CanvasDisplayObject
    	 @alias CanvasDisplayObject.removeEventListener
    	  @requires CanvasEvent
    	 @param {String} eventName the name of the event
    	 @param {Function} callback the callback function
    	 */
    	_.removeEventListener=function(eventName,callback)
    	{
    		//get the canvas
    		var canvas = CanvasRenderer.getCanvasByUID(this.canvasUID);

    		if(!canvas.listeners[eventName]||!canvas.listeners[eventName].callbacks[this.uid])return;
    		for(var a=0;a&lt;canvas.listeners[eventName].callbacks.length;a++)
    		{
    			if(canvas.listeners[eventName].callbacks[a]==undefined)
    			{
    				canvas.listeners[eventName].callbacks.splice(a,1);
    				a--;
    			}
    			if(canvas.listeners[eventName].callbacks[a]==callback)
    			{

    				canvas.listeners[eventName].callbacks.splice(a,1);
    				break;
    			}
    		}
    		//remove listener on canvas is no callbacks
    		if(canvas.listeners[eventName].callbacks.length==0)
    		{
    			switch(eventName)
    			{
    				case 'mouseover':
    				case 'mouseout':
    				//if mouse over of out check mouse move has callback
    				if(!canvas.listeners['mousemove'])
    				canvas.element.removeEventListener('mousemove',canvas.listeners[eventName].event);
    				break;
    				default:
    				// if not a mouse over or our remove the event listener
    				canvas.element.removeEventListener(eventName,canvas.listeners[eventName].event);
    				break;
    			}
    			canvas.listeners[eventName]=null;
    		}

    	};
    })();

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