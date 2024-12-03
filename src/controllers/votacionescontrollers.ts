import { Request, Response, text } from "express";
import pool from "../database";
import { RowDataPacket } from "mysql2";

const la_tabla= "votaciones"


class VotacionesController {
    /*======== listar =========*/
   
      public async list(req: Request, res: Response) {
        const query = `SELECT * FROM ${la_tabla}`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error de conexión" });
          }
    
          connection.query(query, (error, results: RowDataPacket[]) => { // Declara el tipo explícitamente
            connection.release();
    
            if (error) {
              console.log(error);
              return res.status(500).json({ error: "Error en la consulta" });
            }
    
            const alumnos = results.map((dato) => ({ ...dato })); // Convertir resultados en objetos JSON
    
            res.json(alumnos);
          });
        });
      }
      public async listar_para_tabla(req: Request, res: Response) {
        const query = `select votaciones.id_voto,usuarios.id_usuario, usuarios.nombre_usuario,usuarios.permisos,votaciones.id_categoria,categorias.nombre_categoria,nominados.id_nominado,nominados.nombre_nominado
                        from votaciones
                        join usuarios
                        on votaciones.id_usuario = usuarios.id_usuario
                        join categorias
                        on votaciones.id_categoria = categorias.id_categoria
                        join nominados
                        on votaciones.id_nominado = nominados.id_nominado`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error de conexión" });
          }
    
          connection.query(query, (error, results: RowDataPacket[]) => { // Declara el tipo explícitamente
            connection.release();
    
            if (error) {
              console.log(error);
              return res.status(500).json({ error: "Error en la consulta" });
            }
    
            const alumnos = results.map((dato) => ({ ...dato })); // Convertir resultados en objetos JSON
    
            res.json(alumnos);
          });
        });
      }

            /*========listar un =========*/
      public  async getOne(req: Request, res: Response) {
        const {id}=req.params;
        const query = `SELECT * FROM ${la_tabla} WHERE id_voto =?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          connection.query(query,[id], (error, results:RowDataPacket[]) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log(error);
              return;
            }
            const eljuego= results.map((juego)=>({...juego}))
            if(eljuego.length>0){

              res.json(eljuego[0]);
            }
            else{
              res.status(404).json({mensaje:"no existe"})
            }
            
          }
          );
        });
      }
            /*======== Cear =========*/
      public create(req: Request, res: Response) {
    
        
        const query = `INSERT INTO ${la_tabla} set ?`;
        pool.getConnection((error, connection) => {
          if (error) {
            console.log("tenemos un error ------");
            console.log(error);
            return;
          } 

          
          connection.query(query, [req.body], (error) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log("tenemos un error ------");
              
              console.log(error);
              return;
            }
        
          res.json({ message: "Creado existosamente" });
          
          }
          );
        });
        console.log(req.body)
      }

            /*======== Eliminar =========*/
      public async delete(req: Request, res: Response) {
        const {id} =req.params
        const query = `DELETE FROM ${la_tabla} where id_voto = ?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          connection.query(query,[id], (error, results) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log(error);
              return;
            }

            

              res.json("Eliminado exitosamente");
            
          
            
          }
          );
        });

      }
      /*======== editar =========*/
      public async update(req: Request, res: Response) {
        const {id}= req.params
        const query = `UPDATE ${la_tabla} set ? where id_voto=?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          connection.query(query,[req.body,id], (error, results) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log(error);
              return;
            }

            res.json("Midificacion exitosa");
          }
          );
        });
      

      }

     }

     export const votacionescontrollers = new VotacionesController()