"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nominadoController_1 = require("../controllers/nominadoController");
class NominadosRouter {
    constructor() {
        this.controlador = nominadoController_1.nominadoscontrollers;
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", this.controlador.list);
        this.router.get("/:id", this.controlador.getOne);
        this.router.post("/", this.controlador.create);
        this.router.delete("/:id", this.controlador.delete);
        this.router.put("/:id", this.controlador.update);
    }
}
const nominadosRouter = new NominadosRouter();
exports.default = nominadosRouter.router;
