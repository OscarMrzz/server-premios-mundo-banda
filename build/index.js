"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexrouter_1 = __importDefault(require("./router/indexrouter"));
const bandasrouter_1 = __importDefault(require("./router/bandasrouter"));
const categoriasrouter_1 = __importDefault(require("./router/categoriasrouter"));
const nomonadosRouter_1 = __importDefault(require("./router/nomonadosRouter"));
const nominacionesrouter_1 = __importDefault(require("./router/nominacionesrouter"));
const usuariosrouter_1 = __importDefault(require("./router/usuariosrouter"));
const votacionesrouter_1 = __importDefault(require("./router/votacionesrouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routers();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    /* aqui configuramos las rutas*/
    routers() {
        this.app.use("/", indexrouter_1.default);
        this.app.use("/api/bandas/", bandasrouter_1.default),
            this.app.use("/api/categorias/", categoriasrouter_1.default),
            this.app.use("/api/nominados/", nomonadosRouter_1.default),
            this.app.use("/api/nominaciones/", nominacionesrouter_1.default),
            this.app.use("/api/usuarios/", usuariosrouter_1.default),
            this.app.use("/api/votaciones/", votacionesrouter_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
