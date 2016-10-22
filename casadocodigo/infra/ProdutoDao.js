/*
function ProdutoDao(connection) {
	this._connection = connection;
}

ProdutoDao.prototype.lista = function (cb) {

	this._connection.query('select * from livros', function(err,results){
			cb(results);		
	});

};

module.exports = ProdutoDao;
*/

let Livro = require("../models/Livro");

class ProdutoDao {

	constructor(connection) {
		this._connection = connection;
	}

	lista(cb) {
		this._connection.query('select * from livros', function(err,results){
				let livros = results.map(dado => new Livro(dado.id, dado.titulo, 
							dado.preco, dado.descricao)); 
				cb(livros);		
		});
	}

	salva(livro, cb) {
		this._connection.query('insert into livros SET ?', livro, function(err, result) {
			cb();
		});
	}

	buscaPorId(id){
		return new Promise ((resolve, reject) => { 
			this._connection.query('select * from livros where id=?', [id], function(err, results) {
				let livro = new Livro(results[0].id, results[0].titulo, 
					results[0].preco, results[0].descricao);				
				resolve(livro);
			});
		});	
	}

	remove(id, cb){
		this._connection.query('delete from livros where id=?', [id], function(err, results) {
			cb();
		});
	}

	atualiza(livro, cb){
		console.log("Estou no atualizar no DAO")
		this._connection.query('update livros set ? where id=?', [livro,livro.id], function(err, results) {
			cb(livro);
		});
	}


}

module.exports = ProdutoDao;