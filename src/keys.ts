import dotenv from 'dotenv';

// Cargar variables de entorno solo en desarrollo
if (process.env.NODE_ENV !== "production") {
    dotenv.config();  // Carga el archivo .env solo si no estamos en producción
}

export default {
    database: {
        host: process.env.DB_HOST,   // Asegúrate de que las variables estén bien definidas en el archivo .env
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
};
