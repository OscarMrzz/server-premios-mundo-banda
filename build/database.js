"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
// Configurar el pool con el puerto convertido a número
const pool = mysql2_1.default.createPool({
    host: keys_1.default.database.host,
    user: keys_1.default.database.user,
    password: keys_1.default.database.password,
    database: keys_1.default.database.database,
    port: Number(keys_1.default.database.port)
});
// Obtener una conexión del pool
pool.getConnection((error, connection) => {
    if (error) {
        throw error; // Lanza un error si no puede conectar
    }
    else {
        console.log('Conexión exitosa'); // Log en caso de éxito
        connection.release(); // Libera la conexión
    }
});
exports.default = pool;
