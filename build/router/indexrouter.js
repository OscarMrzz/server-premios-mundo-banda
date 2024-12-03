"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const idenxcontrollers_1 = require("../controllers/idenxcontrollers");
class Indexrouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.cofing();
    }
    cofing() {
        this.router.get("/", idenxcontrollers_1.indexcontroller.index);
    }
}
const indexrouter = new Indexrouter();
exports.default = indexrouter.router;
