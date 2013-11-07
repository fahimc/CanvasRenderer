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
	renderCount:0,
	rendering:false,
	renderStartTime:null,
	start : function() {

	},
	/** This will render the canvas
	 @public
	 @alias render
	 @memberOf CanvasRenderer
	 */
	render : function() {
		
		//check if rendering
		if(this.rendering)
		{
			this.renderCount=1;
			
			//current time
			var currentTime = new Date();
			
		}else{
			this.renderStartTime=new Date();
			this.rendering=true;
			for (var a = 0; a < this.children.length; a++) {
				this.checkChildren(this.children[a]);
			}
			var _this=this;
			setTimeout(function(){_this.next();},35);	
		}
		
		
	},
	next:function()
	{
		
		this.rendering=false;
		if(this.renderCount>0)
		{
			this.renderCount=0;
			this.render();
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
		this.setRotation(d, context);
		context.rect(d.style.x(), d.style.y(), d.style.width(), d.style.height());
		if (d.style.backgroundColor()) {
			var rgb = this.hexToRgb(d.style.backgroundColor());
			context.fillStyle = rgb.replace('[x]', d.style.opacity());
			context.fill();
		} else if (d.style.backgroundGradient()) {

			this.setGradientBG(d.style.backgroundGradient().type, context, d);
		}

		if (d.style.strokeStyle()) {
			rgb = this.hexToRgb(d.style.strokeStyle());
			context.lineWidth = d.style.lineWidth();
			context.strokeStyle = rgb.replace('[x]', d.style.opacity());
			context.stroke();
		}
		context.restore();
	},
	drawCircle : function(canvas, d) {
		var context = canvas.getContext('2d');
	
		context.beginPath();
		this.setRotation(d, context);
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
		context.restore();
	},
	drawText : function(canvas, d) {
		var context = canvas.getContext('2d');
		
		context.font = d.style.font();
		context.textBaseline = d.style.textBaseline();
		context.textAlign = d.style.textAlign();
		
		var rgb = this.hexToRgb(d.color());
		context.fillStyle = rgb.replace('[x]', d.style.opacity());
		
		if(d.style.lineWidth())context.lineWidth = d.style.lineWidth();
		if(d.style.strokeStyle())
		{
		rgb = this.hexToRgb(d.style.strokeStyle());
		context.strokeStyle = rgb.replace('[x]', d.style.opacity());			
		}
		
		this.setRotation(d, context, true);
		context.fillText(d.strokeText, d.style.x(), d.style.y());
		context.stroke();
		context.restore();
	},
	drawImage : function(canvas, d) {
		var context = canvas.getContext('2d');
		
		this.setRotation(d, context);
		if (d.clipping != null) {
			context.drawImage(d.img, d.clipping.x, d.clipping.y, d.clipping.w, d.clipping.h, d.style.x(), d.style.y(), d.style.width(), d.style.height());
		} else {
			context.drawImage(d.img, d.style.x(), d.style.y(), d.style.width(), d.style.height());
		}
		context.restore();
	},
	drawLine : function(canvas, d) {
		var context = canvas.getContext('2d');
		context.beginPath();
		context.lineWidth = d.style.lineWidth();
		rgb = this.hexToRgb(d.style.strokeStyle());
		context.strokeStyle = rgb.replace('[x]', d.style.opacity());
		this.setRotation(d, context);
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
		
		context.stroke();
		context.restore();
	},
	setGradientBG : function(type, context, d) {
		var positions = d.style.backgroundGradient().positions;
		var x = d.style.x();
		var y = d.style.y();
		var colorStops = d.style.backgroundGradient().colorStops;
		var grad;
		switch(type) {
			case this.gradientType.LINEAR:
				grad = context.createLinearGradient(x + positions[0], y + positions[1], x + positions[2], y + positions[3]);
				break;
			case this.gradientType.RADIAL:
				grad = context.createRadialGradient(x + positions[0], y + positions[1], positions[2], x + positions[3], y + positions[4], positions[5]);
				break;
		}
		if (colorStops) {
			for (var c = 0; c < colorStops.length; c++) {
				grad.addColorStop(colorStops[c][0], colorStops[c][1]);
			}
		}
		context.fillStyle = grad;
		context.fill();
	},
	setRotation : function(d, context, isText) {
		if (d.style.rotate() != null) {
			var r = (d.style.rotate() + 1) % 360;
			context.save();
			var w = d.style.width();
			var h = d.style.height();
			if (isText) {
				w = context.measureText(d.strokeText).width;
				d.style.width(w,true);
			}
			context.translate(d.style.x()+(w * 0.5), d.style.y()+ (h * 0.5));
			context.rotate(r * (Math.PI / 180));
			context.translate(-(d.style.x()+(w * 0.5)), -(d.style.y()+ (h * 0.5)));
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
		};
		return 'rgba(' + data.r + ',' + data.g + ',' + data.b + ',' + '[x])';
	}
};
