"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nominacionescontrollers_1 = require("../controllers/nominacionescontrollers");
class BandasRouter {
    constructor() {
        this.controlador = nominacionescontrollers_1.nominadoscontrollers;
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", this.controlador.list);
        this.router.get("/nomonados_categoria", this.controlador.list_nominados_categorias);
        this.router.get("/:id", this.controlador.getOne);
        this.router.post("/", this.controlador.create);
        this.router.delete("/:id", this.controlador.delete);
        this.router.put("/:id", this.controlador.update);
    }
}
const bandasRouter = new BandasRouter();
exports.default = bandasRouter.router;
