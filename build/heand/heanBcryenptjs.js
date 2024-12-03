"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparardor_password = exports.incriptar_password = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Incriptador = bcryptjs_1.default;
function incriptar_password(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const paswordIncriptado = yield Incriptador.hash(password, 10);
        return paswordIncriptado;
    });
}
exports.incriptar_password = incriptar_password;
function comparardor_password(passwordNoIncriptado, PasswordSiIncriptado) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Incriptador.compare(passwordNoIncriptado, PasswordSiIncriptado);
    });
}
exports.comparardor_password = comparardor_password;
