let mysql = require("mysql");

let databaseName = "casadocodigo";

if(process.env.NODE_ENV=='test') {
	databaseName="casadocodigo_teste";
	console.log("ambiente de teste");
}

function createConnection() {


	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: databaseName
	});

	return connection;
}

module.exports = createConnection;


