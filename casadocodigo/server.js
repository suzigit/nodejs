var app = require("./custom-express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.set("io", io);
GLOBAL.app = app;

http.listen (3000, function() {
	console.log("Servidor de peh");

});