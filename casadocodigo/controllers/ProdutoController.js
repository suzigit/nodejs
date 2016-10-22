let connectionFactory = require("../infra/connectionFactory");
let ProdutoDao = require("../infra/ProdutoDao");
let co = require("co");

class ProdutoController {


	lista(req,res) {

		let connection = connectionFactory(); 
		let produtoDao = new ProdutoDao(connection);

		produtoDao.lista (function (produtos) {
			res.format({
				html: function() {
					res.render("produtos/lista", {lista: produtos});
				},
				json: function(){
					res.json(produtos);
				}
			});
			connection.end();

		});


		console.log("Recebeu requisição");

	}

	obtemFormulario(req,res){
		res.render("produtos/form", {livro: {}});
	}


	gravar(req,res){

		console.log("submeteu form para gravar");

		let connection = connectionFactory(); 
		let produtoDao = new ProdutoDao(connection);

		let livro = req.body;
		req.assert("titulo", "titulo deve ser preenchido").notEmpty();
		req.assert("preco", "Preco deve ser um numero").isFloat();
		let errors = req.validationErrors();

		if (errors) {
			res.status(400).render('produtos/form', {validationErrors: errors, livro:livro});
		}
		else {
			console.log("vai salvar");

			produtoDao.salva (livro, function() {
				connection.end();
				console.log("salvou");

				//websocket
				GLOBAL.app.get('io').emit("novoLivro", livro);

				res.redirect("produtos");
			});
		}


	}

	buscaPorIdAntigo(req,res) {
		console.log("submeteu form");

		let connection = connectionFactory(); 
		let produtoDao = new ProdutoDao(connection);

		let id = req.params.id;
/*
		produtoDao.buscaPorId(id, function(livro) {
			console.log("livro eh no cadastro eh:");
			console.log(livro);

			res.render("produtos/form", {livro:livro});
		});
*/		
		produtoDao.buscaPorId(id).then(
			function(livro) {
				console.log("livro eh no cadastro eh:");
				console.log(livro);

				res.render("produtos/form", {livro:livro});
		});

	}

	buscaPorId() {
		return co.wrap(function *(req,res){

			console.log("submeteu form");

			let connection = connectionFactory(); 
			let produtoDao = new ProdutoDao(connection);

			let id = req.params.id;

			let livro = yield produtoDao.buscaPorId(id);

			console.log("livro eh no cadastro eh:");
			console.log(livro);

			res.render("produtos/form", {livro:livro});			
		});

	}	


	remove(req,res){

		let connection = connectionFactory(); 
		let produtoDao = new ProdutoDao(connection);

		let id = req.params.id;

		produtoDao.remove(id, function() {
			res.redirect("/produtos");
		});	


	}

	atualiza (req, res) {
		console.log("livro do app.put= ");
		console.log(req.body);

		let connection = connectionFactory(); 
		let produtoDao = new ProdutoDao(connection);

		let livro = req.body;

		produtoDao.atualiza(livro, function(livro2) {
			console.log("livro2 eh:");
			console.log(livro2);
			res.redirect("/produtos");
		});			
	}
}


module.exports = new ProdutoController();