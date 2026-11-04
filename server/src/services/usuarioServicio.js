// Importa todas las operaciones de acceso a datos del model de usuarios.
import * as usuarioModelo from "../models/usuarioModelo.js";

import bcrypt from "bcryptjs";

// Obtiene la fecha actual según la zona horaria de Colombia.
const obtenerFechaActual = () => {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Bogota"
    }).format(new Date());
};

// Busca un usuario mediante su correo electrónico.
export const consultarUsuarioPorCorreo = (correo) => {
    return usuarioModelo.obtenerUsuarioPorCorreo(correo);
};

// Registra un nuevo usuario.
export const registrarUsuario = async (datos) => {
    const usuarioExistente = await usuarioModelo.obtenerUsuarioPorCorreo(
        datos.correo
    );

    if (usuarioExistente) {
        return {
            exito: false,
            error: "El correo ya está registrado."
        };
    }

    const fechaActual = obtenerFechaActual();

    if (datos.fecha_nacimiento && datos.fecha_nacimiento > fechaActual) {
        return {
            exito: false,
            error: "La fecha de nacimiento no puede ser futura."
        };
    }

    const contrasenaHasheada = await bcrypt.hash(datos.contrasena, 10);

    const datosConHash = {
        ...datos,
        contrasena: contrasenaHasheada
    };

    const usuario = await usuarioModelo.crearUsuario(datosConHash);

    return {
        exito: true,
        usuario
    };
};

// Consulta un usuario mediante su identificador.
export const consultarUsuarioPorId = async (id) => {
    const usuario = await usuarioModelo.buscarUsuarioPorId(id);

    if (!usuario) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true,
        usuario
    };
};

// Obtiene todos los usuarios registrados.
export const listarUsuarios = async () => {
    const usuarios = await usuarioModelo.listarUsuarios();

    return {
        exito: true,
        usuarios
    };
};

// Actualiza los datos de un usuario.
export const actualizarUsuario = async (id, datos) => {
    const usuario = await usuarioModelo.buscarUsuarioPorId(id);

    if (!usuario) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    const fechaActual = obtenerFechaActual();

    if (datos.fecha_nacimiento && datos.fecha_nacimiento > fechaActual) {
        return {
            exito: false,
            error: "La fecha de nacimiento no puede ser futura."
        };
    }

    const usuarioExistente = await usuarioModelo.obtenerUsuarioPorCorreo(
        datos.correo
    );

    if (usuarioExistente && usuarioExistente.id_usuario !== Number(id)) {
        return {
            exito: false,
            error: "Este correo ya está registrado."
        };
    }


    const usuarioActualizado = await usuarioModelo.actualizarUsuario(id, datos);

    return {
        exito: true,
        usuarioActualizado
    };
};

// Elimina un usuario mediante su identificador.
export const eliminarUsuario = async (id) => {
    const resultado = await usuarioModelo.eliminarUsuario(id);

    if (resultado === 0) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true
    };
};

// Hashea y actualiza la contraseña de un usuario.
export const actualizarContrasena = async (id, contrasena) => {
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    const resultado = await usuarioModelo.actualizarContrasena(
        id, contrasenaHasheada
    );

    if (resultado === 0) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true
    };
};
