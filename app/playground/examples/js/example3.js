(function(window) {

var circle;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad() {
	
		//create a canvas
		canvas = new Canvas();
		canvas.build();
		canvas.width(500);
		canvas.height(500);
		document.getElementById('canvasHolder').appendChild(canvas.element);
		
		//bg
		var bg=new Sprite();
		bg.beginFill("#333");
		bg.drawRect(0,0,500,500);
		
		canvas.appendChild(bg);
		
		//create a circle
		circle = new Sprite();
		 circle.beginFill('#A8CD1B',0.5);
		circle.drawCircle(0,0,40);
		canvas.appendChild(circle);
		
		//animate Circle
		
		CanvasTween.to(circle,1,{x:200,y:100,delay:1,ease:"ease-in"});
		
	}

	Main();
} )(window);
