let co = require("co");

function tempo1() {
	return new Promise((resolve, reject) => {
		setTimeout( () => {
			resolve("Fim A");
		}, 5000);
	});
}

function tempo2() {
	return new Promise((resolve, reject) => {
		setTimeout( () => {
			resolve("Fim B");
		}, 1000);
	});
}


function *acao() {

	let retorno = yield tempo1();
	console.log(retorno);
	let retorno2 = yield tempo2();
	console.log(retorno2);

}


co(acao());

console.log("FIM");

//tempo1().then(resultado => console.log(resultado));
//tempo2().then(resultado => console.log(resultado));

//No ES7 -> nao precisa do co. faz nativamente. ao inves de usar yield, usar wait.
