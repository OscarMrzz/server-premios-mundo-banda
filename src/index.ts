import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors"
import indexrouter from "./router/indexrouter";
import bandasRouter from "./router/bandasrouter";
import categoriasRouter from "./router/categoriasrouter";
import nominadosRouter from "./router/nomonadosRouter";
import nominacionesRouter from "./router/nominacionesrouter";
import usuariosRouter from "./router/usuariosrouter";
import votacionesRouter from "./router/votacionesrouter";





class Server {
    public app: Application;
    constructor() {

        this.app = express();
        this.config();
        this.routers();

    }
    config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))
    }
    /* aqui configuramos las rutas*/
    routers(): void {
        this.app.use("/", indexrouter)
        this.app.use("/api/bandas/", bandasRouter),
        this.app.use("/api/categorias/", categoriasRouter),
        this.app.use("/api/nominados/", nominadosRouter),
        this.app.use("/api/nominaciones/", nominacionesRouter),
        this.app.use("/api/usuarios/", usuariosRouter),
        this.app.use("/api/votaciones/", votacionesRouter)
   

    }
    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port", this.app.get("port"))
        })

    }

}

const server = new Server();
server.start();



