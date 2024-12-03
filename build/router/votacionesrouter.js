"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votacionescontrollers_1 = require("../controllers/votacionescontrollers");
class VotacionesRouter {
    constructor() {
        this.controlador = votacionescontrollers_1.votacionescontrollers;
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
const votacionesRouter = new VotacionesRouter();
exports.default = votacionesRouter.router;
