let controller = require("../controllers/ProdutoController");


module.exports = function(app) {


	app.get("/produtos", controller.lista);

	app.get("/produtos/form", controller.obtemFormulario);

	app.post("/produtos", controller.gravar);

	app.get("/produtos/form/:id", controller.buscaPorId());

	app.delete("/produtos/:id", controller.remove);

	app.put("/produtos/:id", controller.atualiza);

}


