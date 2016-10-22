let express = require("express");
let bodyParser = require("body-parser");
let expressValidator = require("express-validator");
let methodOverride = require("method-override");

module.exports = function () {
	var app = express();

	app.set("view engine", "ejs");

	app.use(express.static("./public"));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	app.use(methodOverride(function(req, res) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}));

	require("./routes/produtos")(app);

	app.use(function(req,res,next) {

		res.status(404).render('errors/404');

		//nao chama next pq nao tem mais middleware
	});


	return app;
}
