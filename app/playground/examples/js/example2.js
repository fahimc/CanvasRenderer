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
		
		//create a label inside of the circle
		var tf = new TextField();
		 tf.build();
		tf.text("DRAG ME");
		tf.style.x(40);
		tf.style.y(40);
		tf.style.font("Arial 12px");
		tf.style.textAlign("center");
		tf.style.textBaseline("middle");
		tf.color("#fff");
		circle.appendChild(tf);
		
		//add an event listener
		circle.addEventListener('mousedown',onDown);
		
	}
	
	function onDown()
	{
		 canvas.addEventListener('mousemove',onMove);
		 canvas.addEventListener('mouseup',onUp);
	}
	function onUp(event)
	{
		 canvas.removeEventListener('mousemove',onMove);
		 canvas.removeEventListener('mouseup',onUp);
	}
	function onMove(event)
	{
		circle.style.x(event.pageX-(canvas.element.offsetLeft+40));
		circle.style.y(event.pageY-(canvas.element.offsetTop+40));
	}
	Main();
} )(window);
