(function(window) {
	var code;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad() {
		code = document.getElementById('code');
		code.addEventListener('keyup',result);
	}
	function result()
	{
		document.getElementById("display").innerHTML="";
		var js = code.value.replace('document.body','document.getElementById("display")');
		try
		{
		eval(js);			
		}catch(e)
		{
			
		}

	}
	Main();
} )(window); 