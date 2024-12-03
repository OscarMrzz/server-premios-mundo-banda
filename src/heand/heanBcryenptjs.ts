import bcrypt from "bcryptjs"

const Incriptador = bcrypt

export async function incriptar_password(password:string) {
    const paswordIncriptado= await Incriptador.hash(password,10)
    return paswordIncriptado
    
}

export async function comparardor_password(passwordNoIncriptado:string,PasswordSiIncriptado:string) {
    return await Incriptador.compare(passwordNoIncriptado,PasswordSiIncriptado)

    
}