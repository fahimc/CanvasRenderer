/*! CanvasRenderer - v0.0.1 - 2013-10-26 */
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
		context.textAlign = d.textAlign;
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

var Canvas = function() {
};
(function() {
	/** @scope Canvas */
	var _ = Canvas.prototype;
	_.element = null;
	_.children = [];
	_.uid = null;
	/**
	 build the DisplayObject
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
				this.children.splice(a, 1);
				return;

			}
		}
	};
})();

var CanvasDisplayObject=function(){
	this.children=[];
	this.update=false;
	this.style=null;
	this.id="";
	this.uid=null;
    this.canvasUID=null;
	this.type=CanvasRenderer.types.RECT;
	this.state="";
};
(function()
{
	var _ = CanvasDisplayObject.prototype;
	
	_.build=function()
	{
		this.uid = CanvasRenderer.uid++;
		this.style=new CanvasStyle();
		this.style.uid =  CanvasRenderer.uid++;
		
	};
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

	_.appendChild=function(displayObject)
	{
		displayObject.style.parent=this;
		displayObject.canvasUID=this.canvasUID;
		this.children.push(displayObject);
		CanvasRenderer.getCanvasByUID(this.canvasUID).appendChild(displayObject);
	};
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
	}
	_.hitTestPoint=function(x,y)
	{
		if(this.style.x()<=x && x<=this.style.x()+this.style.width() && this.style.y()<=y && y<=this.style.y()+this.style.height())return true;
		return false;
	}
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

var CanvasStyle=function(){
	this.parent =null;
	this.hasUpdates=false;
	this.props={
	};
};
(function()
{
	var _ = CanvasStyle.prototype;
	
	_.width=function(value)
	{
		if(value!=undefined)this.updateProp('width',value);

		return this.props['width']!=undefined?(this.scaleX() * this.props['width'].value):0;
	};
	_.x=function(value)
	{
		if(value!=undefined)this.updateProp('x',value);
		return this.getVal('x',0);
	};
	_.y=function(value)
	{
		if(value!=undefined)this.updateProp('y',value);
		return this.getVal('y',0);
	};
	_.height=function(value)
	{
		if(value!=undefined)this.updateProp('height',value);
		return this.props['height']!=undefined?((this.type==CanvasRenderer.types.CIRCLE?this.scaleX():this.scaleY()) * this.props['height'].value):0;
	};
	_.scaleX=function(value)
	{
		if(value!=undefined)this.updateProp('scaleX',value);
		return this.getNested('scaleX',1);
	};
	_.scaleY=function(value)
	{
		if(value!=undefined)this.updateProp('scaleY',value);
		return this.getNested('scaleY',1);
	};
	_.radius=function(value)
	{
		if(value!=undefined)this.updateProp('radius',value);
		return this.props['radius']!=undefined?(this.scaleX() * this.props['radius'].value):0;
	};
	_.opacity=function(value)
	{
		if(value!=undefined)this.updateProp('opacity',value);
		return this.getNested('opacity',1);
	};
	_.backgroundColor=function(value)
	{
		if(value!=undefined)this.updateProp('backgroundColor',value);
		return this.props['backgroundColor']!=undefined?this.props['backgroundColor'].value:"";
	};
	_.font=function(value)
	{
		if(value!=undefined)this.updateProp('font',value);
		return this.props['font']!=undefined?this.props['font'].value:"40px san-serif";
	};
	_.textBaseline =function(value)
	{
		if(value!=undefined)this.updateProp('textBaseline',value);
		return this.props['textBaseline']!=undefined?this.props['textBaseline'].value:"top";
	};
	_.lineWidth=function(value)
	{
		if(value!=undefined)this.updateProp('lineWidth',value);
		return this.props['lineWidth']!=undefined?this.props['lineWidth'].value:" ";
	};
	_.strokeStyle=function(value)
	{
		if(value!=undefined)this.updateProp('strokeStyle',value);
		return this.props['strokeStyle']!=undefined?this.props['strokeStyle'].value:" ";
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
	ease : {
		easeIn : "ease-in",
		easeOut : "ease-out",
		strongEaseOut : "strong-ease-out",
		easeBack : "ease-back",
		easeInOut : "ease-in-out"
	},
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
	this.beginFill=function(color,opacity)
	{
		if(!this.style)this.build();
		this.style.backgroundColor(color);
		if(opacity)this.style.opacity(opacity);
	};
	this.drawCircle=function(x, y, r)
	{
		this.type="CIRCLE";
		this.style.x(x);
		this.style.y(y);
		this.style.radius(r);
		this.style.width(r * 2);
		this.style.height(r * 2);
	};
	this.drawRect=function(x, y, w,h)
	{
		this.type=CanvasRenderer.types.RECT;
		this.style.x(x);
		this.style.y(y);
		this.style.width(w);
		this.style.height(h);
	};
};
(function()
{
	Sprite.prototype = new CanvasDisplayObject();
	Sprite.prototype.constructor = CanvasDisplayObject;
	
	
	
})();

var TextField = function(){
	this.type=CanvasRenderer.types.TEXT;
	this.strokeText="";
	this.textAlign="start";
	this._color="#000";
	this.text=function(value)
	{
		
		this.strokeText=value;
		CanvasRenderer.render();
	};
	this.color=function(value)
	{
		if(value)
		{
			this._color=value;
		CanvasRenderer.render();
		}
		return this._color;
	};
};
(function()
{
	TextField.prototype = new CanvasDisplayObject();
	TextField.prototype.constructor = CanvasDisplayObject;
	
	
	
})();
