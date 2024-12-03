import jwt from "jsonwebtoken"

const key ="zaipher"

export function generadorToken(usuario:any){
    if(!usuario){
        throw new Error("se requiere un usuario")
    }else{
        const token =jwt.sign(
            {
             id_usuario:usuario.id_usuario,
             nombre_usuario:usuario.nombre_usuario,
             permisos:usuario.permisos,
             acceso:usuario.acceso
            },key
         )

         return token
    }

}

export function verificarToken(token:any) {
    try {
        // Verificar el token
        const decoded = jwt.verify(token, key);

        // Aquí puedes verificar información adicional si es necesario
        // Por ejemplo, comparar el `usuario` con los datos del token
        return {
            valido: true,
            datos: decoded, // Información decodificada del token
        };
    } catch (error:any) {
        return {
            valido: false,
            error: error.message, // Mensaje de error para depuración
        };
    }
}