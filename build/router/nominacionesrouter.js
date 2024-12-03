"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nominacionescontrollers_1 = require("../controllers/nominacionescontrollers");
class BandasRouter {
    constructor() {
        this.controlador = nominacionescontrollers_1.nominacionescontrollers;
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", this.controlador.list);
        this.router.get("/listar_para_tabla", this.controlador.listar_para_tabla);
        this.router.get("/:id", this.controlador.getOne);
        this.router.post("/", this.controlador.create);
        this.router.delete("/:id", this.controlador.delete);
        this.router.put("/:id", this.controlador.update);
    }
}
const bandasRouter = new BandasRouter();
exports.default = bandasRouter.router;
