import { Router } from "express";
import {bandascontrollers} from "../controllers/bandascontrollers";

class BandasRouter {
  controlador=bandascontrollers
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

const bandasRouter = new BandasRouter();
export default bandasRouter.router;


