"use strict";
/* import dotenv from 'dotenv'; */
Object.defineProperty(exports, "__esModule", { value: true });
// Cargar variables de entorno solo en desarrollo
/* if (process.env.NODE_ENV !== "production") {
    dotenv.config();  // Carga el archivo .env solo si no estamos en producción
} */
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
/* export default {
    database: {
        host: "mysql.railway.internal",   // Asegúrate de que las variables estén bien definidas en el archivo .env
        user: "root",
        password: "sdxnPWePqOMxPqNQXLsnYUjKdwOKAWxG",
        database: "railway",
        port: 3306,
    }
};
 */
const config_1 = require("./config");
console.log("==============================================");
console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
});
exports.default = {
    database: {
        host: config_1.DB_HOST,
        user: config_1.DB_USER,
        password: config_1.DB_PASSWORD,
        database: config_1.DB_NAME,
        port: config_1.DB_PORT,
    }
};
