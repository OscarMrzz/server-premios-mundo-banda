import mysql from 'mysql2';
import keys from './keys';

const pool = mysql.createPool(keys.database)

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