"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nominacionescontrollers = void 0;
const database_1 = __importDefault(require("../database"));
const la_tabla = "nominaciones";
class NominacionesController {
    /*======== listar =========*/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${la_tabla}`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Error de conexión" });
                }
                connection.query(query, (error, results) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: "Error en la consulta" });
                    }
                    const alumnos = results.map((dato) => (Object.assign({}, dato))); // Convertir resultados en objetos JSON
                    res.json(alumnos);
                });
            });
        });
    }
    /*======== LIstar nominaciones junto con categoria =========*/
    listar_para_tabla(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select nominaciones.id_nominacion, nominaciones.id_nominado, nominaciones.id_categoria, nominados.nombre_nominado, categorias.nombre_categoria
                        from nominaciones
                        join nominados
                        on nominaciones.id_nominado = nominados.id_nominado
                        join categorias
                        on nominaciones.id_categoria =categorias.id_categoria`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Error de conexión" });
                }
                connection.query(query, (error, results) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: "Error en la consulta" });
                    }
                    const alumnos = results.map((dato) => (Object.assign({}, dato))); // Convertir resultados en objetos JSON
                    res.json(alumnos);
                });
            });
        });
    }
    /*========listar un =========*/
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `SELECT * FROM ${la_tabla} WHERE id_nominacion =?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [id], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    const eljuego = results.map((juego) => (Object.assign({}, juego)));
                    if (eljuego.length > 0) {
                        res.json(eljuego[0]);
                    }
                    else {
                        res.status(404).json({ mensaje: "no existe" });
                    }
                });
            });
        });
    }
    /*======== Cear =========*/
    create(req, res) {
        const query = `INSERT INTO ${la_tabla} set ?`;
        database_1.default.getConnection((error, connection) => {
            if (error) {
                console.log("tenemos un error ------");
                console.log(error);
                return;
            }
            connection.query(query, [req.body], (error) => {
                connection.release(); // Devuelve la conexión al pool
                if (error) {
                    console.log("tenemos un error ------");
                    console.log(error);
                    return;
                }
                res.json({ message: "Creado existosamente" });
            });
        });
        console.log(req.body);
    }
    /*======== Eliminar =========*/
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `DELETE FROM ${la_tabla} where id_nominacion = ?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [id], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    res.json("Eliminado exitosamente");
                });
            });
        });
    }
    /*======== editar =========*/
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `UPDATE ${la_tabla} set ? where id_nominacion=?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [req.body, id], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    res.json("Midificacion exitosa");
                });
            });
        });
    }
}
exports.nominacionescontrollers = new NominacionesController();
