import { Router } from "express";
import {nominadoscontrollers} from "../controllers/nominadoController";

class NominadosRouter {
  controlador=nominadoscontrollers
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", this.controlador.list);
    this.router.get("/:id", this.controlador.getOne);
    this.router.post("/", this.controlador.create);
    this.router.delete("/:id", this.controlador.delete);
    this.router.put("/:id", this.controlador.update);
  }
}

const nominadosRouter = new NominadosRouter();
export default nominadosRouter.router;


