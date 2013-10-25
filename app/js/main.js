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
		
		 dp = new CanvasDisplayObject();
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
		displayObject2.style.strokeStyle("#00f");
		displayObject2.style.backgroundColor('#0f0');
				displayObject2.style.scaleX(0.4);
		displayObject2.style.scaleY(0.4);
		canvas.appendChild(displayObject2);
		
		
		var displayObject3 = new Sprite();
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
		// CanvasTween.to(displayObject2,3,{y:0,x:200,delay:1,ease:CanvasTween.ease.easeIn});
		CanvasTween.to(displayObject2,3,{scaleX:1,scaleY:1,opacity:1,x:200,y:0});
		CanvasTween.to(dp,1,{x:300,y:40,width:50,height:50,ease:CanvasTween.ease.easeOut,onComplete:onComplete});
		
		
	}
	function moveBox(event)
	{
		displayObject2.style.x(event.pageX);
		displayObject2.style.y(event.pageY);
	}
	function onComplete()
	{
		console.log("oncomplete");
		CanvasTween.to(dp,1,{y:270,ease:CanvasTween.ease.easeOut});
		document.addEventListener("mousemove",moveBox);
	}
	Main();
} )(window); 