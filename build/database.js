"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql2_1.default.createPool(keys_1.default.database);
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
