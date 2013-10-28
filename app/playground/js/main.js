(function(window) {
	var code;
	var data;
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
		data=null;
		for(var name in this)
		{
			console.log(typeof this[name],this[name]);
			if(typeof this[name] ==="string" && this[name].indexOf())
			{
				console.log("found");
				this[name]=null;
				delete this[name];
			}
		}
		document.getElementById("display").innerHTML="";
		var js = code.value.replace('document.body','document.getElementById("display")');
		try
		{
		data = eval(js);			
		}catch(e)
		{
			
		}

	}
	Main();
} )(window); 