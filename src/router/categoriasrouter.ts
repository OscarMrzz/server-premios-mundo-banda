import { Router } from "express";
import {categoriascontrollers} from "../controllers/categoriascontrollers";

class CategoriasRouter {
  controlador=categoriascontrollers
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

const categoriasRouter = new CategoriasRouter();
export default categoriasRouter.router;


