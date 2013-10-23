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
		canvas.addChild(dp);
		
		var displayObject2 = new CanvasDisplayObject();
		displayObject2.build();
		displayObject2.id="d2";
		displayObject2.style.width(200);
		displayObject2.style.height(200);
		displayObject2.style.x(100);
		displayObject2.style.y(100);
		displayObject2.style.strokeStyle("#00f");
		displayObject2.style.backgroundColor('#0f0');
		canvas.addChild(displayObject2);
		
		
		var displayObject3 = new CanvasDisplayObject();
		displayObject3.build();
		displayObject3.id="d3";
		displayObject3.style.width(50);
		displayObject3.style.height(50);
		displayObject3.style.x(100);
		displayObject3.style.y(100);
		displayObject3.style.strokeStyle("#000");
		displayObject3.style.backgroundColor('#FFF');
		displayObject2.addChild(displayObject3);
		
		CanvasTween.to(displayObject2,3,{y:0,x:200,width:50,height:50,delay:1,ease:CanvasTween.ease.easeIn});
	//	CanvasTween.to(displayObject3,3,{x:0,y:0,ease:CanvasTween.ease.easeIn});
		CanvasTween.to(dp,1,{x:300,y:40,width:50,height:50,ease:CanvasTween.ease.easeOut,onComplete:onComplete});
		
		
	}
	function moveBox(event)
	{
		dp.style.x(event.pageX);
		dp.style.y(event.pageY);
	}
	function onComplete()
	{
		console.log("oncomplete");
		CanvasTween.to(dp,1,{y:270,ease:CanvasTween.ease.easeOut});
		//document.addEventListener("mousemove",moveBox);
	}
	Main();
} )(window); 