"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.generadorToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = "zaipher";
function generadorToken(usuario) {
    if (!usuario) {
        throw new Error("se requiere un usuario");
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            permisos: usuario.permisos,
            acceso: usuario.acceso
        }, key);
        return token;
    }
}
exports.generadorToken = generadorToken;
function verificarToken(token) {
    try {
        // Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, key);
        // Aquí puedes verificar información adicional si es necesario
        // Por ejemplo, comparar el `usuario` con los datos del token
        return {
            valido: true,
            datos: decoded, // Información decodificada del token
        };
    }
    catch (error) {
        return {
            valido: false,
            error: error.message, // Mensaje de error para depuración
        };
    }
}
exports.verificarToken = verificarToken;
