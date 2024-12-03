import { Router } from "express";
import {indexcontroller } from "../controllers/idenxcontrollers"


class Indexrouter{
   public router: Router = Router();
   constructor(){
    this.cofing();
   }
   cofing(): void{
    this.router.get("/",indexcontroller.index);
   }
}

const indexrouter = new Indexrouter();
export default indexrouter.router;