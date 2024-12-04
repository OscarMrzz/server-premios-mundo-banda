import mysql from 'mysql2';
import keys  from './keys';

// Configurar el pool con el puerto convertido a número
const pool = mysql.createPool({
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
  port:Number(keys.port)
});


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
