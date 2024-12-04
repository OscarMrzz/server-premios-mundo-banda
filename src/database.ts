import mysql from 'mysql2';
import keys from './keys';

// Configurar el pool con el puerto convertido a número
const pool = mysql.createPool({
  host: keys.database.host,
  user: keys.database.user,
  password: keys.database.password,
  database: keys.database.database,
  port:Number(keys.database.port)
});
console.log("==============================================")
console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
});""

// Obtener una conexión del pool
pool.getConnection((error, connection) => {
  if (error) {
    throw error; // Lanza un error si no puede conectar
  } else {
    console.log('Conexión exitosa'); // Log en caso de éxito
    connection.release(); // Libera la conexión
  }
});

export default pool;
