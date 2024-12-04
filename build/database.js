"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql2_1.default.createPool({
    host: keys_1.default.database.host,
    user: keys_1.default.database.user,
    password: keys_1.default.database.password,
    database: keys_1.default.database.database,
    port: keys_1.default.database.port ? parseInt(keys_1.default.database.port) : undefined // Asegúrate de convertir el puerto a número
});
// Obtener una conexión del pool
//aqui nos lansa error si no se puede conectar
pool.getConnection((error, connection) => {
    if (error) {
        throw error;
    }
    else {
        console.log('conexión exitosa');
        connection.release();
    }
});
exports.default = pool;
