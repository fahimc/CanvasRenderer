/*! CanvasRenderer - v0.0.1 - 2013-11-06 */
var CanvasRenderer = {
	/**
	 * @property {Object} types types of elements
	 * @property {String} types.RECT defines a RECT display object
	 * @property {String} types.CIRCLE defines a CIRCLE display object
	 * @property {String} types.TEXT defines a TEXT display object
	 * @property {String} types.IMAGE defines a IMAGE display object
	 * @property {String} types.LINE defines a LINE display object
	 */
	types : {
		RECT : "RECT",
		CIRCLE : "CIRCLE",
		TEXT : "TEXT",
		IMAGE : "IMAGE",
		LINE : "LINE"
	},
	/**
	 * @property {Object} lineType types of lines
	 * @property {String} lineType.LINE defines a striaght line
	 * @property {String} lineType.CURVE defines a curved line
	 */
	lineType : {
		LINE : "LINE",
		CURVE : "CURVE",
		BEZIER_CURVE : "BEZIER_CURVE"
	},
	/**
	 * @property {Object} gradientType types of gradients
	 * @property {String} gradientType.LINEAR defines a linear gradient
	 * @property {String} gradientType.RADIAL defines a radial gradient
	 */
	gradientType : {
		LINEAR : "LINEAR",
		RADIAL : "RADIAL"
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
		for (var a = 0; a < this.children.length; a++) {
			this.checkChildren(this.children[a]);
		}
	},
	checkChildren : function(canvas) {
		for (var b = 0; b < canvas.children.length; b++) {
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
		for (var c = 0; c < canvas.children.length; c++) {
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
				case this.types.LINE:
					this.drawLine(canvas, displayObject);
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
		for (var a = 0; a < this.children.length; a++) {
			var canvas = this.children[a];
			for (var b = 0; b < canvas.children.length; b++) {
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
		for (var a = 0; a < this.children.length; a++) {
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
		if (d.style.backgroundColor()) {
			var rgb = this.hexToRgb(d.style.backgroundColor());
			context.fillStyle = rgb.replace('[x]', d.style.opacity());
			context.fill();
		} else if (d.style.backgroundGradient()) {
			
			this.setGradientBG(d.style.backgroundGradient().type,context,d);
		}
			
		if (d.style.strokeStyle()) {
			rgb = this.hexToRgb(d.style.strokeStyle());
			context.lineWidth = d.style.lineWidth();
			context.strokeStyle = rgb.replace('[x]', d.style.opacity());
			context.stroke();
		}

	},
	drawCircle : function(canvas, d) {
		var context = canvas.getContext('2d');
		context.beginPath();
		var radius = d.style.radius();
		var centerX = d.style.x() + radius;
		var centerY = d.style.y() + radius;
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		if (d.style.backgroundColor()) {
			var rgb = this.hexToRgb(d.style.backgroundColor());
			context.fillStyle = rgb.replace('[x]', d.style.opacity());
			context.fill();
		}
		if (d.style.strokeStyle()) {
			context.lineWidth = d.style.lineWidth();
			rgb = this.hexToRgb(d.style.strokeStyle());
			context.strokeStyle = rgb.replace('[x]', d.style.opacity());
			context.stroke();
		}
	},
	drawText : function(canvas, d) {
		var context = canvas.getContext('2d');
		context.save();
		if(d.style.rotate()!=null)
		{
			
			context.rotate(d.style.rotate());
		}
		var rgb = this.hexToRgb(d.color());
		context.fillStyle = rgb.replace('[x]', d.style.opacity());
		context.textBaseline = d.style.textBaseline();
		context.font = d.style.font();
		context.lineWidth = d.style.lineWidth();
		context.textAlign = d.style.textAlign();
		
		context.fillText(d.strokeText, d.style.x(), d.style.y());
		 context.restore();
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
	drawLine : function(canvas, d) {
		var context = canvas.getContext('2d');
		context.beginPath();
		context.moveTo(d.style.x(), d.style.y());
		for (var name in d.lines) {
			var line = d.lines[name];
			switch(line.type) {
				case this.lineType.LINE:
					context.lineTo(line.x, line.y);
					break;
				case this.lineType.CURVE:
					context.quadraticCurveTo(line.cpx, line.cpy, line.x, line.y);
					break;
				case this.lineType.BEZIER_CURVE:
					context.bezierCurveTo(line.cp1x, line.cp1y, line.cp2x, line.cp2y, line.x, line.y);
					break;
			}

		}
		if (d.style.backgroundColor()) {
			var rgb = this.hexToRgb(d.style.backgroundColor());
			context.fillStyle = rgb.replace('[x]', d.style.opacity());
			context.fill();
		}
		context.lineWidth = d.style.lineWidth();
		rgb = this.hexToRgb(d.style.strokeStyle());
		context.strokeStyle = rgb.replace('[x]', d.style.opacity());
		context.stroke();
	},
	setGradientBG:function(type,context,d)
	{
		var positions = d.style.backgroundGradient().positions;
		var x = d.style.x();
		var y = d.style.y();
			var colorStops = d.style.backgroundGradient().colorStops;
			var grad;
			switch(type)
			{
				case this.gradientType.LINEAR:
				grad = context.createLinearGradient(x+positions[0], y+positions[1], x+positions[2], y+positions[3]);
				break;
				case this.gradientType.RADIAL:
				grad = context.createRadialGradient(x+positions[0], y+positions[1], positions[2],x+positions[3], y+positions[4],positions[5]);
				break;
			}
			if (colorStops) {
				for (var c = 0; c < colorStops.length; c++) {
					grad.addColorStop(colorStops[c][0], colorStops[c][1]);
				}
			}
			context.fillStyle=grad;
			context.fill();
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
		};
		return 'rgba(' + data.r + ',' + data.g + ',' + data.b + ',' + '[x])';
	}
};

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

var CanvasDisplayObject=function(){
	/** @property {Array} children array of children */
	this.children=[];
	/** @property {Boolean} update check if this object has been updated */	
	this.update=false;
	/** @property {CanvasStyle} the style object */	
	this.style=null;
	/** @property {String} id style set an id for the object */	
	this.id="";
	/** @property {Number} uid a unique reference for this object */	
	this.uid=null;
	/** @property {Number} canvasUID a unique reference for the parent canvas */	
    this.canvasUID=null;
	/** @property {String} type the type */	
	this.type=CanvasRenderer.types.RECT;
	/** @property {String}  state the state of the object*/	
	this.state="";
};
(function()
{
	var _ = CanvasDisplayObject.prototype;
	/**
	 build the CanvasDisplayObject
	 @public
	 @alias build
	 @memberOf CanvasDisplayObject
	 */
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.style=new CanvasStyle();
		this.style.uid =  CanvasRenderer.uid++;
		
	};
	/**
	 check if any children has been updated
	 @public
	 @alias hasUpdates
	 @memberOf CanvasDisplayObject
	 @return {Boolean}
	 */
	_.hasUpdates=function()
	{
		var has= this.style.check();
		if(has)
		{
			for(var a=0;a<this.children.length;a++)
			{
				this.children[a].style.hasUpdates=true;
			}
		}
			return has;
	};
	/**
	 adds an object to the CanvasDisplayObject
	 @public
	 @alias appendChild
	 @memberOf CanvasDisplayObject
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.appendChild=function(displayObject)
	{
		displayObject.style.parent=this;
		this.children.push(displayObject);
		if(CanvasRenderer.getCanvasByUID(this.canvasUID))
		{
			displayObject.canvasUID=this.canvasUID;
			CanvasRenderer.getCanvasByUID(this.canvasUID).appendChild(displayObject);			
		}
	};
	/**
	 removes an object to the CanvasDisplayObject
	 @public
	 @alias removeChild
	 @memberOf CanvasDisplayObject
	 @param {CanvasDisplayObject} displayObject provide a displayobject
	 */
	_.removeChild=function(displayObject)
	{
		for (var a = 0; a < this.children.length; a++) {
			var d = this.children[a];
			if (d.uid == displayObject.uid)
			{
				this.children.splice(a,1);
				
				
			}
		}
		CanvasRenderer.getCanvasByUID(this.canvasUID).removeChild(displayObject);
	};
	/**
	 check if the CanvasDisplayObject is within the points provided
	 @public
	 @alias hitTestPoint
	 @memberOf CanvasDisplayObject
	 @param {Number} x provide the x value
	 @param {Number} y provide the y value
	 */
	_.hitTestPoint=function(x,y)
	{
		if(this.style.x()<=x && x<=this.style.x()+this.style.width() && this.style.y()<=y && y<=this.style.y()+this.style.height())return true;
		return false;
	};
})();

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
		for(var a=0;a<this.listeners[eventName].callbacks.length;a++)
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
		for(var a=0;a<canvas.listeners[eventName].callbacks.length;a++)
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
	};
};
(function() {
	CanvasImage.prototype = new CanvasDisplayObject();
	CanvasImage.prototype.constructor = CanvasDisplayObject;

})();

var CanvasStyle=function(){
	this.parent =null;
	this.hasUpdates=false;
	this.props={
	};
};
(function()
{
	var _ = CanvasStyle.prototype;
	/**
	 set the width
	 @public
	 @alias width
	 @memberOf CanvasStyle
	  @param {number} value width
	 @returns {Number}
	 */
	_.width=function(value)
	{
		if(value!=undefined)this.updateProp('width',value);

		return this.props['width']!=undefined?(this.scaleX() * this.props['width'].value):0;
	};
	/**
	 set the x position
	 @public
	 @alias x
	 @memberOf CanvasStyle
	  @param {Number} value x
	 @returns {Number}
	 */
	_.x=function(value)
	{
		if(value!=undefined)this.updateProp('x',value);
		return this.getVal('x',0);
	};
	/**
	 set the y position
	 @public
	 @alias y
	 @memberOf CanvasStyle
	  @param {Number} value y 
	 @returns {Number}
	 */
	_.y=function(value)
	{
		if(value!=undefined)this.updateProp('y',value);
		return this.getVal('y',0);
	};
	/**
	 set the height
	 @public
	 @alias height
	 @memberOf CanvasStyle
	  @param {Number} value height
	 @returns {Number}
	 */
	_.height=function(value)
	{
		if(value!=undefined)this.updateProp('height',value);
		return this.props['height']!=undefined?((this.type==CanvasRenderer.types.CIRCLE?this.scaleX():this.scaleY()) * this.props['height'].value):0;
	};
	/**
	 set the scaleX
	 @public
	 @alias scaleX
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.scaleX=function(value)
	{
		if(value!=undefined)this.updateProp('scaleX',value);
		return this.getNested('scaleX',1);
	};
	/**
	 set the scaleY
	 @public
	 @alias scaleY
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.scaleY=function(value)
	{
		if(value!=undefined)this.updateProp('scaleY',value);
		return this.getNested('scaleY',1);
	};
	/**
	 set the radius
	 @public
	 @alias radius
	 @memberOf CanvasStyle
	  @param {Number} value the radius of a circle
	 @returns {Number}
	 */
	_.radius=function(value)
	{
		if(value!=undefined)this.updateProp('radius',value);
		return this.props['radius']!=undefined?(this.scaleX() * this.props['radius'].value):0;
	};
	/**
	 set the opacity
	 @public
	 @alias opacity
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.opacity=function(value)
	{
		if(value!=undefined)this.updateProp('opacity',value);
		return this.getNested('opacity',1);
	};
	/**
	 set the rotate
	 @public
	 @alias rotate
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 360
	 @returns {Number}
	 */
	_.rotate=function(value)
	{
		if(value!=undefined)this.updateProp('rotate',value*Math.PI/180);
		return this.props['rotate']!=undefined?(this.props['rotate'].value/Math.PI/180):null;
	};
	/**
	 set the backgroundColor
	 @public
	 @alias backgroundColor
	 @memberOf CanvasStyle
	  @param {String} value hex colour
	 @returns {String}
	 */
	_.backgroundColor=function(value)
	{
		if(value!=undefined)this.updateProp('backgroundColor',value);
		return this.props['backgroundColor']!=undefined?this.props['backgroundColor'].value:"";
	};
	/**
	 set the backgroundGradient. The positions are relative to the x and y of the object not the canvas.
	 @public
	 @alias backgroundGradient
	 @memberOf CanvasStyle
	  @param {String} type type of gradient 'linear' or 'radial'
	  @param {Array} positions An Array of 4 gradient points, x0,y0,x1,y1 for linear or 6 points for radial. Check w3schools.
	 @returns {Array} colorStops An Array of colorStops which are also arrays of two items opacity (0 to 1) amd colour.
	 */
	_.backgroundGradient=function(type,positions,colorStops)
	{
		if(positions!=undefined)this.updateProp('backgroundGradient',{type:type,positions:positions,colorStops:colorStops});
		return this.props['backgroundGradient']!=undefined?this.props['backgroundGradient'].value:null;
	};
	/**
	 set the font
	 @public
	 @alias font
	 @memberOf CanvasStyle
	  @param {String} value string containing font family and size etc.. 
	 @returns {String}
	 */
	_.font=function(value)
	{
		if(value!=undefined)this.updateProp('font',value);
		return this.props['font']!=undefined?this.props['font'].value:"40px san-serif";
	};
	/**
	 set the textBaseline
	 @public
	 @alias textBaseline
	 @memberOf CanvasStyle
	  @param {String} value top,middle and bottom etc..
	 @returns {String}
	 */
	_.textBaseline =function(value)
	{
		if(value!=undefined)this.updateProp('textBaseline',value);
		return this.props['textBaseline']!=undefined?this.props['textBaseline'].value:"top";
	};
	/**
	 set the textAlign
	 @public
	 @alias textAlign
	 @memberOf CanvasStyle
	  @param {String} value start etc..
	 @returns {String}
	 */
	_.textAlign =function(value)
	{
		if(value!=undefined)this.updateProp('textAlign',value);
		return this.props['textAlign']!=undefined?this.props['textAlign'].value:"start";
	};
	/**
	 set the lineWidth
	 @public
	 @alias lineWidth
	 @memberOf CanvasStyle
	  @param {Number} value provide the size
	 @returns {Number}
	 */
	_.lineWidth=function(value)
	{
		if(value!=undefined)this.updateProp('lineWidth',value);
		return this.props['lineWidth']!=undefined?this.props['lineWidth'].value:"";
	};
	/**
	 set the strokeStyle
	 @public
	 @alias String
	 @memberOf CanvasStyle
	  @param {String} value hex colour
	 @returns {String}
	 */
	_.strokeStyle=function(value)
	{
		if(value!=undefined)this.updateProp('strokeStyle',value);
		return this.props['strokeStyle']!=undefined?this.props['strokeStyle'].value:"";
	};
	_.updateProp=function(name,val)
	{
		
		if(!this.props[name])this.props[name]={value:val,updated:false};
		this.props[name].value = val;
		this.props[name].updated= true;
		this.hasUpdates= true;
		CanvasRenderer.render();
	};
	_.getVal=function(name,val)
	{
		if(this.props[name]==undefined)return val;
		if(!this.parent)return this.props[name].value;
		return this.parent.style[name]()+this.props[name].value;
	};
	_.getNested=function(name,val)
	{
		if(!this.parent)return this.props[name]?this.props[name].value:val;
		if(this.props[name]==undefined)return this.parent.style[name]()* val;
		return this.parent.style[name]()<1?(this.parent.style[name]()*this.props[name].value):(this.props[name].value<0?0:this.props[name].value);
	};
	_.setVal=function(val,name)
	{
		if(!this.parent||isNaN(val))return val;
		
		return val-this.parent.style[name]();
	};
	_.check=function()
	{

		return this.hasUpdates;
	};
	_.updated=function()
	{
		for(var name in this.props)
		{
			this.props[name].updated=false;
		}
	};
})();

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
		this.index++;
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
		for (var itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
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

					if (option.currentFrame <= CanvasRenderer.frameRate) {

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
		CanvasRenderer.render();
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
		CanvasRenderer.render();
	};
	/**
	 draw a bezier curved line
	 @public
	 @alias Sprite.bezierCurveTo
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
		CanvasRenderer.render();
	};
};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	
	
})();

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
