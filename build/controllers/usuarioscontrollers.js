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
exports.usuarioscontrollers = void 0;
const database_1 = __importDefault(require("../database"));
const heanBcryenptjs_1 = require("../heand/heanBcryenptjs");
const generarToken_1 = require("../heand/generarToken");
const la_tabla = "usuarios";
class UsuariosController {
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
    /*========listar un =========*/
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_usuario } = req.params;
            const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [nombre_usuario], (error, results) => {
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
    /*========verificar accesor de usuario unico =========*/
    getOneAcceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_usuario } = req.params;
            const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [nombre_usuario], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    const DatosUsuario = results.map((Dato) => (Object.assign({}, Dato)));
                    if (DatosUsuario.length > 0) {
                        let LosDatosUsuario = DatosUsuario[0];
                        res.json(LosDatosUsuario.acceso);
                    }
                    else {
                        res.status(404).json({ mensaje: "no existe" });
                    }
                });
            });
        });
    }
    /*========login =========*/
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_usuario, password } = req.body;
            const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return;
                }
                connection.query(query, [nombre_usuario], (error, results) => __awaiter(this, void 0, void 0, function* () {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    const elusuario = results.map((usuario) => (Object.assign({}, usuario)));
                    if (elusuario.length > 0) {
                        let datosDelUsuario = elusuario[0];
                        const comprobacion = yield (0, heanBcryenptjs_1.comparardor_password)(password, datosDelUsuario.password);
                        if (comprobacion) {
                            let token = (0, generarToken_1.generadorToken)(datosDelUsuario);
                            res.send({ token });
                        }
                        if (!comprobacion) {
                            res.status(404).json({ mensaje: "contaseña inccorecta" });
                        }
                    }
                    else {
                        res.status(404).json({ mensaje: "no existe" });
                    }
                }));
            });
        });
    }
    /*========revisar acceso =========*/
    getacceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { permiso } = req.params;
            const query = `SELECT acceso FROM ${la_tabla} WHERE permisos =? limit 1;`;
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.error("error al querer ver el permiso de: ", permiso);
                    console.log(error);
                    return;
                }
                connection.query(query, [permiso], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log("error al querer ver el acceso");
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
        database_1.default.getConnection((error, connection) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log("tenemos un error ------");
                console.log(error);
                return;
            }
            let datos = req.body;
            const passwordIncritada = yield (0, heanBcryenptjs_1.incriptar_password)(datos.password);
            datos.password = passwordIncritada;
            connection.query(query, [datos], (error) => {
                connection.release(); // Devuelve la conexión al pool
                if (error) {
                    console.log("tenemos un error ------");
                    console.log(error);
                    return;
                }
                res.json({ message: "Creado existosamente" });
            });
        }));
    }
    /*======== Eliminar =========*/
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `DELETE FROM ${la_tabla} where id_usuario = ?`;
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
            console.log("======================================");
            console.log("iniciando modificcion de usuario");
            const { id_usuario } = req.params;
            const query = `UPDATE ${la_tabla} set ? where id_usuario=?`;
            yield database_1.default.getConnection((error, connection) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return;
                }
                let datos = req.body;
                const passwordIncritada = yield (0, heanBcryenptjs_1.incriptar_password)(datos.password);
                datos.password = passwordIncritada;
                connection.query(query, [datos, id_usuario], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log(error);
                        return;
                    }
                    res.json("Midificacion exitosa");
                });
            }));
        });
    }
    /*======== editar_acceso =========*/
    update_acceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("===========================================================");
            console.log("Iniciamos el cambio de acceso");
            const { permisos } = req.params; // Parámetro 'permisos' de la URL
            const { acceso } = req.body; // Dato 'acceso' del cuerpo de la solicitud
            // Query de actualización
            const query = `
            UPDATE usuarios
            SET acceso = ?
            WHERE permisos = ?;
          `;
            // Conexión y ejecución de la consulta
            yield database_1.default.getConnection((error, connection) => {
                if (error) {
                    console.log("Error de conexión:", error);
                    return res.status(500).json({ error: 'Error de conexión a la base de datos' });
                }
                console.log(`Acceso: ${acceso}, Permisos: ${permisos}`);
                // Ejecutar la consulta con los valores de acceso y permisos
                connection.query(query, [acceso, permisos], (error, results) => {
                    connection.release(); // Devuelve la conexión al pool
                    if (error) {
                        console.log("Error al ejecutar la consulta:", error);
                        return res.status(500).json({ error: 'Error al actualizar el acceso' });
                    }
                    console.log("Actualización exitosa");
                    res.json({ message: "Modificación exitosa" });
                });
            });
        });
    }
}
exports.usuarioscontrollers = new UsuariosController();
