import { Router } from "express";
import {usuarioscontrollers} from "../controllers/usuarioscontrollers";

class UsuariosRouter {
  controlador=usuarioscontrollers
  public router: Router = Router();

  constructor() {
    console.log("-----------------------------------")
    this.config();
  }

  config(): void {
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
export default usuariosRouter.router;


