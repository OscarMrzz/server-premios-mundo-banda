import {Request,Response} from "express"

class IndexController{
    public index (req: Request,res: Response){
        res.json({texto:"api is /ipi/aaaa "})
    }
}

export const indexcontroller = new IndexController();