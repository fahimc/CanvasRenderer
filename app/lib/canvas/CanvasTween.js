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
