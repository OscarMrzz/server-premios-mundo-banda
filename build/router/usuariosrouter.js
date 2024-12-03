"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioscontrollers_1 = require("../controllers/usuarioscontrollers");
class UsuariosRouter {
    constructor() {
        this.controlador = usuarioscontrollers_1.usuarioscontrollers;
        this.router = (0, express_1.Router)();
        console.log("-----------------------------------");
        this.config();
    }
    config() {
        this.router.get("/", this.controlador.list);
        this.router.get("/:nombre_usuario", this.controlador.getOne);
        this.router.get("/AccesoUsuario/:nombre_usuario", this.controlador.getOneAcceso);
        this.router.get("/revicion_permiso/:permiso", this.controlador.getacceso);
        this.router.post("/", this.controlador.create);
        this.router.post("/login/:nombre_usuario", this.controlador.login);
        this.router.delete("/:id", this.controlador.delete);
        this.router.put("/update/:id_usuario", this.controlador.update);
        this.router.put("/acceso/:permisos", this.controlador.update_acceso);
    }
}
const usuariosRouter = new UsuariosRouter();
exports.default = usuariosRouter.router;
