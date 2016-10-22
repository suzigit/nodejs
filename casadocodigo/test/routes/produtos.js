let app = require('../../custom-express')();
let request = require("supertest")(app);

//supertest sobe a aplicacao e mocha eh a linguagem em que se escreve

describe('Rotas de produto', function() {

	it("deve devolver produtos no formato JSON", function(done) {

		request.get('/produtos')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, done);


	}); 

	it("deve devolver produtos no formato HTML", function(done) {

		request.get('/produtos')
//				.expect('Content-Type', 'text/html')
				.expect('Content-Type', /html/)
				.expect(200, done);
		
	}); 


});

