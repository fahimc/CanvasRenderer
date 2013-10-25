var CanvasRenderer = {
	types : {
		RECT : "RECT",
		CIRCLE : "CIRCLE",
		TEXT : "TEXT"
	},
	frameRate : 35,
	timer : null,
	children : [],
	callbacks : [],
	uid : 0,
	start : function() {
		
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
				case this.types.TEXT:
					this.drawText(canvas, displayObject);
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
		context.rect(d.style.x(), d.style.y(), d.style.width() , d.style.height());
		var rgb = this.hexToRgb(d.style.backgroundColor());
		context.fillStyle =rgb.replace('[x]', d.style.opacity());
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
		context.fillStyle =rgb.replace('[x]', d.style.opacity());
		context.fill();
		context.lineWidth = d.style.lineWidth();
		rgb = this.hexToRgb(d.style.strokeStyle());
		context.strokeStyle = rgb.replace('[x]', d.style.opacity());
		context.stroke();
	},
	drawText : function(canvas, d) {
		console.log("text",d.strokeText);
		var context = canvas.getContext('2d');
		var rgb = this.hexToRgb(d.color());
		context.fillStyle =rgb.replace('[x]', d.style.opacity());
		context.textBaseline = d.style.textBaseline();
		context.font = d.style.font();
		context.lineWidth = d.style.lineWidth();
		context.textAlign = d.textAlign;
		context.fillText(d.strokeText,d.style.x(),d.style.y());
		context.stroke();
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
