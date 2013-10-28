(function() {
	var express = require("express");
	var app = express();
	app.use("/js", express.static("./app/js"));
	app.use("/css", express.static("./app/css"));
	app.use("/img", express.static("./app/img"));
	app.use("/lib", express.static("./app/lib"));
	app.use("/playground", express.static("./app/playground"));
	app.listen(3001);
	app.get("/", function(request, response) {
		response.sendfile("./app/index.html");
	});
})();
