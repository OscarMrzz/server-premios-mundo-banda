"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno solo en desarrollo
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config(); // Carga el archivo .env solo si no estamos en producción
}
else {
    process.env.DB_HOST = "junction.proxy.rlwy.net";
    process.env.DB_USER = "root";
    process.env.DB_PASSWORD = "sdxnPWePqOMxPqNQXLsnYUjKdwOKAWxG";
    process.env.DB_NAME = "railway";
    process.env.DB_PORT = "35866";
}
exports.default = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};
