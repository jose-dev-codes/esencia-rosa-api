// Importa la función del modelo encargada de buscar el usuario en PostgreSQL.
import { obtenerUsuarioPorCorreo } from "../models/usuarioModelo.js";

import {
    registrarTokenRevocado,
    tokenEstaRevocado
} from "../models/tokenRevocadoModelo.js";// pendiente

// Importa bcrypt para comparar la contraseña recibida con el hash almacenado.
import bcrypt from "bcryptjs";

export const validarCredenciales = async (correo, contrasena) => {
    try {
        // Busca el usuario mediante el modelo.
        const usuario = await obtenerUsuarioPorCorreo(correo);

        // Si no existe un usuario con ese correo, las credenciales no son válidas.
        if (!usuario) return null;

        // Compara la contraseña recibida con el hash almacenado en la base de datos.
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        // Si la contraseña no coincide con el hash, se rechazan las credenciales.
        if (!contrasenaValida) return null;

        // Un usuario inactivo no puede iniciar sesión.
        if (usuario.estado !== "activo") return null;

        // Devuelve únicamente los datos del usuario necesarios para continuar con la autenticación.
        return {
            usuario: {
                id_usuario: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                numero_telefono: usuario.numero_telefono,
                fecha_nacimiento: usuario.fecha_nacimiento,
                rol: usuario.rol
            }
        };

    } catch (error) {
        // Propaga el error para que el controller gestione la respuesta al cliente.
        throw new Error(
            "Error en la base de datos durante la autenticación.",
            { cause: error }
        );
    }
};

// Registra el token como revocado para impedir que se siga utilizando después de cerrar sesión.
export const cerrarSesion = async (tokenId, fechaExpiracion) => {
    try {
        await registrarTokenRevocado(tokenId, fechaExpiracion);

    } catch (error) {
        throw new Error(
            "Error en la base de datos al cerrar la sesión.",
            { cause: error }
        );
    }
};

// Comprueba si un token fue revocado.
export const verificarTokenRevocado = async (tokenId) => {
    try {
        return await tokenEstaRevocado(tokenId);

    } catch (error) {
        throw new Error(
            "Error en la base de datos al verificar el token.",
            { cause: error }
        );
    }
};
