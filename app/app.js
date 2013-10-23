(function() {
	var express = require("express");
	var app = express();
	app.use("/js", express.static("./app/js"));
	app.use("/css", express.static("./app/css"));
	app.use("/img", express.static("./app/img"));
	app.listen(3000);
	app.get("/", function(request, response) {
		response.sendfile("./app/index.html");
	});
})();
