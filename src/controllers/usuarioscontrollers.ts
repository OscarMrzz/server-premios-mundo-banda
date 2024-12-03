import { Request, Response, text } from "express";
import pool from "../database";
import { RowDataPacket } from "mysql2";
import { comparardor_password, incriptar_password } from "../heand/heanBcryenptjs";
import { generadorToken } from "../heand/generarToken";

const la_tabla= "usuarios"


class UsuariosController {
  
  

  
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

            /*========listar un =========*/
      public  async getOne(req: Request, res: Response) {
        const {nombre_usuario}=req.params;
        const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          connection.query(query,[nombre_usuario], (error, results:RowDataPacket[]) => {
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
            /*========verificar accesor de usuario unico =========*/
      public  async getOneAcceso(req: Request, res: Response) {
        const {nombre_usuario}=req.params;
        const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          connection.query(query,[nombre_usuario], (error, results:RowDataPacket[]) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log(error);
              return;
            }
            const DatosUsuario= results.map((Dato)=>({...Dato}))
            if(DatosUsuario.length>0){
              let LosDatosUsuario =DatosUsuario[0]

              
              
              res.json(LosDatosUsuario.acceso);
            }
            else{
              res.status(404).json({mensaje:"no existe"})
            }
            
          }
          ); 
        });
      }
            /*========login =========*/
      public  async login(req: Request, res: Response) {
        const {nombre_usuario,password}=req.body;
  
      
        const query = `SELECT * FROM ${la_tabla} WHERE nombre_usuario =?`;
        await pool.getConnection((error, connection) => {
          if (error) {
            console.log(error);
            return;
          }



          connection.query(query,[nombre_usuario], async (error, results:RowDataPacket[]) => {
            connection.release(); // Devuelve la conexión al pool

            if (error) {
              console.log(error);
              return;
            }
            const elusuario= results.map((usuario)=>({...usuario}))
            if(elusuario.length>0){
              let datosDelUsuario=elusuario[0]
             

              const comprobacion=  await comparardor_password(password,datosDelUsuario.password)
              if(comprobacion){
                let token =generadorToken(datosDelUsuario)

              res.send( {token}); 
            }
            if(!comprobacion){
              res.status(404).json({mensaje:"contaseña inccorecta"})
            }
             
            }
            else{
              res.status(404).json({mensaje:"no existe"})
            }
            
          }
          );
        });
      }


             /*========revisar acceso =========*/
             public  async getacceso(req: Request, res: Response) {
              const {permiso}=req.params;
              const query = `SELECT acceso FROM ${la_tabla} WHERE permisos =? limit 1;`;
              await pool.getConnection((error, connection) => {
                if (error) {
                  console.error("error al querer ver el permiso de: ",permiso)
                  console.log(error);
                  return;
                }
      
                connection.query(query,[permiso], (error, results:RowDataPacket[]) => {
                  connection.release(); // Devuelve la conexión al pool
      
                  if (error) {
                    console.log("error al querer ver el acceso")
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
        pool.getConnection(async (error, connection) => {
          if (error) {
            console.log("tenemos un error ------");
            console.log(error);
            return;
          } 
          let datos=req.body
          const passwordIncritada= await incriptar_password(datos.password)
          datos.password=passwordIncritada
          

          
          connection.query(query, [datos], (error) => {
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
 
      }

            /*======== Eliminar =========*/
      public async delete(req: Request, res: Response) {
        const {id} =req.params
        const query = `DELETE FROM ${la_tabla} where id_usuario = ?`;
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
        console.log("======================================")
        console.log("iniciando modificcion de usuario")
        
        const {id_usuario}= req.params


        const query = `UPDATE ${la_tabla} set ? where id_usuario=?`;
        await pool.getConnection(async (error, connection) => {
          if (error) {
            console.log(error);
            return;
          }

          let datos=req.body
       
          const passwordIncritada= await incriptar_password(datos.password)
          datos.password=passwordIncritada
    
          
       
          connection.query(query,[datos,id_usuario], (error, results) => {
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



         /*======== editar_acceso =========*/
         public async update_acceso(req: Request, res: Response) {
          console.log("===========================================================");
          console.log("Iniciamos el cambio de acceso");
        
          const { permisos } = req.params; // Parámetro 'permisos' de la URL
          const { acceso } = req.body; // Dato 'acceso' del cuerpo de la solicitud
        
          // Query de actualización
          const query = `
            UPDATE usuarios
            SET acceso = ?
            WHERE permisos = ?;
          `;
        
          // Conexión y ejecución de la consulta
          await pool.getConnection((error, connection) => {
            if (error) {
              console.log("Error de conexión:", error);
              return res.status(500).json({ error: 'Error de conexión a la base de datos' });
            }
        
            console.log(`Acceso: ${acceso}, Permisos: ${permisos}`);
        
            // Ejecutar la consulta con los valores de acceso y permisos
            connection.query(query, [acceso, permisos], (error, results) => {
              connection.release(); // Devuelve la conexión al pool
        
              if (error) {
                console.log("Error al ejecutar la consulta:", error);
                return res.status(500).json({ error: 'Error al actualizar el acceso' });
              }
        
              console.log("Actualización exitosa");
              res.json({ message: "Modificación exitosa" });
            });
          });
  
        }

     }

     export const usuarioscontrollers = new UsuariosController()
