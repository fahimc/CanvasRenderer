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
		var bg = new Sprite();
		bg.beginFill("#333");
		bg.drawRect(0, 0, 500, 500);
		canvas.appendChild(bg);

		//create a circle
		circle = new Sprite();
		circle.beginFill('#A8CD1B', 0.5);
		circle.drawCircle(0, 0, 40);
		canvas.appendChild(circle);

		//create a rectangle with a gradient bg
		rect = new Sprite();
		rect.beginFill('#3F4C6B', 1);
		rect.drawRect(100, 300, 150, 150);
		rect.style.backgroundColor("");
		rect.style.backgroundGradient(CanvasRenderer.gradientType.LINEAR,[0,0,0,100],[[0,"#3F4C6B"],[1,"#9F3C9B"]]);
		canvas.appendChild(rect);
		
		rect.style.rotate(45);
		
		
		//create a line
		line = new Sprite();
		line.moveTo(230, 230);
		line.lineTo(280, 230);
		line.lineTo(280, 280);
		line.quadraticCurveTo(280, 380, 400, 280);
		line.lineTo(320, 200);
		line.bezierCurveTo(320, 300, 400, 300, 400, 320);
		line.style.strokeStyle("#B02B2C");
		line.style.lineWidth(3);

		canvas.appendChild(line);
		
		
		//create a custom shape
		custom = new Sprite();
		custom.moveTo(170, 80);
		custom.bezierCurveTo(130, 100, 130, 150, 230, 150);
		custom.bezierCurveTo(250, 180, 320, 180, 340, 150);
		custom.bezierCurveTo(420, 150, 420, 120, 390, 100);
		custom.bezierCurveTo(430, 40, 370, 30, 340, 50);
		custom.bezierCurveTo(320, 5, 250, 20, 250, 50);
		custom.bezierCurveTo(200, 5, 150, 20, 170, 80);
		custom.style.strokeStyle("#C79810");
		custom.style.backgroundColor("#C79810");
		custom.style.opacity(0.5);
		canvas.appendChild(custom);
		
		
		this.label = new TextField();
		this.label.build();
		this.label.text("PRICE");
		this.label.style.rotate(-90);
		this.label.style.font('12px Arial #FFFFFF');
		this.label.color('#FFFFFF');
		canvas.appendChild(this.label);
		
	}

	Main();
} )(window);
