var CanvasRenderer = {
	types : {
		RECT : "RECT",
		CIRCLE : "CIRCLE"
	},
	frameRate : 35,
	timer : null,
	children : [],
	callbacks:[],
	uid:0,
	start : function() {
		// if (!this.timer) {
			// var root = this;
			// this.timer = setInterval(function() {
				// root.onRender();
			// }, this.frameRate);
		// }
	},
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
			}
		}
		this.dispatch();
	},
	stop : function() {
		clearInterval(this.timer);
		this.timer = null;
	},
	dispatch:function()
	{
		for(var name in this.callbacks)
		{
			this.callbacks[name]();
		}
	},
	addCallback:function(name,func)
	{
		this.callbacks[name]=func;
	},
	hasCallback:function(name)
	{
		return this.callbacks[name]?true:false;
	},
	removeCallback:function(name)
	{
			this.callbacks[name]=null;
			delete this.callbacks[name];
	},
	getDisplayByUID:function(uid)
	{
		for (var a = 0; a < this.children.length; a++) {
			var canvas = this.children[a];
			for (var b = 0; b < canvas.children.length; b++) {
				if(canvas.children[b].uid==uid)return canvas.children[b];
			}
		}
		return null;
	},
	getCanvasByUID:function(uid)
	{
		for (var a = 0; a < this.children.length; a++) {
			var canvas = this.children[a];
			if(canvas.uid==uid)return canvas;	
		}
		return null;
	},
	drawRect : function(canvas, displayObject) {
		var context = canvas.getContext('2d');
		context.beginPath();
		context.rect(displayObject.style.x(), displayObject.style.y(), displayObject.style.width(), displayObject.style.height());
		context.fillStyle = displayObject.style.backgroundColor();
		context.fill();
      	context.lineWidth= displayObject.style.lineWidth();
		context.strokeStyle = displayObject.style.strokeStyle();
		context.stroke();
	},
	drawCircle : function(canvas, displayObject) {
		var context = canvas.getContext('2d');
		context.beginPath();
		var radius = displayObject.style.radius();
		var centerX =displayObject.style.x()+radius;
		var centerY =displayObject.style.y()+radius;
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		//context.rect(displayObject.style.x(), displayObject.style.y(), displayObject.style.width(), displayObject.style.height());
		context.fillStyle = displayObject.style.backgroundColor();
		context.fill();
      	context.lineWidth= displayObject.style.lineWidth();
		context.strokeStyle = displayObject.style.strokeStyle();
		context.stroke();
	}
};
