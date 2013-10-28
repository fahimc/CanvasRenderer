(function(window) {
	var dp ;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad() {
		
		var canvas = new Canvas();
		canvas.build();
		canvas.width(500);
		canvas.height(500);
		document.body.appendChild(canvas.element);
		
		var dp = new CanvasDisplayObject();
		 dp.build();
		dp.style.width(20);
		dp.style.height(20);
		dp.style.x(20);
		dp.style.y(20);
		dp.id="d1";
		dp.style.backgroundColor('#f00');
		canvas.appendChild(dp);
		
		displayObject2 = new Sprite();
		 // displayObject2.build();
		 displayObject2.beginFill('#00f',0.5);
		displayObject2.id="d2";
		displayObject2.drawRect(50,50,100,100);
		//displayObject2.style.strokeStyle("#00f");
		displayObject2.style.backgroundColor('#0f0');
		displayObject2.style.scaleX(0.4);
		displayObject2.style.scaleY(0.4);
		canvas.appendChild(displayObject2);
		
		
		displayObject3 = new Sprite();
		displayObject3.id="d3";
		 // displayObject3.build();
		 displayObject3.beginFill('#FFF',1);
		displayObject3.drawCircle(0,0,40);
		displayObject3.style.strokeStyle("#000");
		displayObject3.style.backgroundColor('#FFF');

		
		displayObject2.appendChild(displayObject3);
		
		 tf = new TextField();
		 tf.build();
		tf.text("hello");
		tf.style.x(0);
		tf.style.y(0);
		displayObject2.appendChild(tf);
		
		img = new CanvasImage();
		img.src('img/google_android.png');
		img.style.width(100);
		img.style.height(100);
		img.style.scaleX(0.5);
		canvas.appendChild(img);
		
		img.clip(null);
		
		
		line = new Sprite();

		line.moveTo(0,0);
		line.lineTo(30,50);
		line.lineTo(50,100);
		line.lineTo(150,100);
		canvas.appendChild(line);
		
		// CanvasTween.to(displayObject2,3,{y:0,x:200,delay:1,ease:CanvasTween.ease.easeIn});
		CanvasTween.to(displayObject2,3,{scaleX:1,scaleY:1,opacity:1,x:200,y:0});
		
		
		dp.addEventListener('click',onClick);
		
		canvas2 = new Canvas();
		canvas2.build();
		canvas2.width(500);
		canvas2.height(500);
		document.body.appendChild(canvas2.element);
		
		// displayObject3.addEventListener('mouseout',onOut);
	}
	function moveBox(event)
	{
		if(displayObject2.hitTestPoint(event.pageX,event.pageY))
		{
			CanvasTween.to(displayObject2,2,{scaleX:0.5,scaleY:0.5});
		}
		
	}
	function onClick(event)
	{
		CanvasTween.to(dp,1,{x:300,y:40,width:50,height:50,ease:CanvasTween.ease.easeOut,onComplete:onComplete});
		displayObject2.removeChild(tf);
		dp.removeEventListener('click',onClick);
	}
	function onDown(event)
	{
		console.log('down');
		 canvas.addEventListener('mousemove',onMove);
		 canvas.addEventListener('mouseup',onUp);
	}
	function onUp(event)
	{
		console.log('up');
		 canvas.removeEventListener('mousemove',onMove);
		 canvas.removeEventListener('mouseup',onUp);
	}
	function onMove(event)
	{
		dp.style.x(event.pageX);
		dp.style.y(event.pageY);
	}
	function onOut(event)
	{
		console.log('out');
		 displayObject3.beginFill('#FFF',1);
	}
	function onComplete()
	{
		console.log("oncomplete");
		CanvasTween.to(dp,1,{y:270,ease:CanvasTween.ease.easeOut});
		dp.addEventListener('mousedown',onDown);
		//document.addEventListener("mousemove",moveBox);
	}
	Main();
} )(window); 