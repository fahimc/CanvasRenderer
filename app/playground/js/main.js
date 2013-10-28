(function(window) {
	var editor;
	var data;
	var code;
	var currentIndex=0;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad() {
		
		//code.addEventListener('keyup', result);
		
		editor = ace.edit("editor");
		editor.getSession().setMode("ace/mode/javascript");
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setTabSize(2);
		editor.getSession().setUseWrapMode(true);
		editor.getSession().on('change',result);
		
		
		Utensil.URLLoader.load("data.json",onDataLoaded);
		
		document.getElementById("examples").addEventListener("change",displayExample);
	}
	function onDataLoaded(t,x)
	{
		data = JSON.parse(t);
		console.log(data);	
		showExamples();
		displayExample();
	}
	function showExamples()
	{
		for(var a=0;a<data.examples.length;a++)
		{
			var opt = new Option([data.examples[a].title], a);
			document.getElementById("examples").appendChild(opt);
		}
	}
	function displayExample()
	{
		currentIndex =document.getElementById("examples").selectedIndex;
		var val = document.getElementById("examples").options[currentIndex].value;
		var re = new RegExp(';', 'g');
		var c=data.examples[val].code.replace(re,";\n");
		editor.setValue(c);
	}
	function result() {
		code = null;
		document.getElementById("display").innerHTML = "";
		var js = editor.getValue().replace('document.body', 'document.getElementById("display")');
		try {
			code = eval(js);
		} catch(e) {

		}

	}

	Main();
} )(window);
