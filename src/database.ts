import mysql from 'mysql2';
import keys from './keys';



const pool = mysql.createPool({
  host: keys.database.host,
  user: keys.database.user,
  password: keys.database.password,
  database: keys.database.database,
  port: keys.database.port ? parseInt(keys.database.port) : undefined // Asegúrate de convertir el puerto a número
});

// Obtener una conexión del pool
//aqui nos lansa error si no se puede conectar
pool.getConnection((error, connection) => {
    if (error) {
      throw error;
    } else {
      console.log('conexión exitosa');
      connection.release();
    }
  });

  export default pool;