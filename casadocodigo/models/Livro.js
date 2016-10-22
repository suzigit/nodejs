class Livro {


	constructor(id,titulo,preco,descricao) {
		this._id = id;
		this._titulo = titulo;
		this._preco = preco;
		this._descricao = descricao;
	}

	get titulo() {
		return this._titulo;
	}

	set titulo(titulo) {
		this._titulo=titulo;
	}

	get preco() {
		return this._preco;
	}

	set preco(preco) {
		this._preco=preco;
	}

	get descricao() {
		return this._descricao;
	}

	set descricao(descricao) {
		this._descricao=descricao;
	}

	get id() {
		return this._id;
	}


}

module.exports = Livro;