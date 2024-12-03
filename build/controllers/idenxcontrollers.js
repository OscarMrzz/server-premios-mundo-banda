"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexcontroller = void 0;
class IndexController {
    index(req, res) {
        res.json({ texto: "api is /ipi/aaaa " });
    }
}
exports.indexcontroller = new IndexController();
