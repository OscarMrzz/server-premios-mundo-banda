import { Router } from "express";
import {votacionescontrollers} from "../controllers/votacionescontrollers";

class VotacionesRouter {
  controlador=votacionescontrollers
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", this.controlador.list);
    this.router.get("/listar_para_tabla", this.controlador.listar_para_tabla);
    this.router.get("/:id", this.controlador.getOne);
    this.router.post("/", this.controlador.create);
    this.router.delete("/:id", this.controlador.delete);
    this.router.put("/:id", this.controlador.update);
  }
}

const votacionesRouter = new VotacionesRouter();
export default votacionesRouter.router;


