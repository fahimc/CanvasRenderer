(function(window) {
var canvas;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad() {
	

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
		
		//create line
		var line = new Sprite();
		line.moveTo(0,350);
		line.lineTo(500,350);
		line.style.strokeStyle("#666");
		canvas.appendChild(line);
		
		
		//draw bars
		var x=0;
		var numberOfBars =10;
		var total = 500 / 50;
		for(var a=0;a<total;a++)
		{
			var height = Math.floor(Math.random() * 200) + 20;
			createBar(x,50,height);
			x+=50;
		}
		
	}
	
	function createBar(x,w,h)
	{
		var bar = new Sprite();
		bar.beginFill("#0099ff",0.4);
		bar.drawRect(x,350-h,50,h);
		bar.style.strokeStyle("#666");
		canvas.appendChild(bar);
		var delay = Math.floor(Math.random() * 3) + 1;
		CanvasTween.to(bar,3,{height:0,y:350,delay:delay,ease:"ease-out",onComplete:function(){bringUp(bar,h);}});
	}
	function bringUp(bar,h)
	{
		CanvasTween.to(bar,3,{height:h,y:350-h,ease:"ease-out",delay:1});
	}

	Main();
} )(window);
