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
/* export default {
    database: {
        host: process.env.DB_HOST,   // Asegúrate de que las variables estén bien definidas en el archivo .env
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
};
 */
exports.default = {
    database: {
        host: "mysql.railway.internal",
        user: "root",
        password: "sdxnPWePqOMxPqNQXLsnYUjKdwOKAWxG",
        database: "railway",
        port: 3306,
    }
};
