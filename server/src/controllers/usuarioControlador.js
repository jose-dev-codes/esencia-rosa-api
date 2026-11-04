import * as usuarioServicio from "../services/usuarioServicio.js";

// Comprueba que los campos obligatorios estén presentes y no vacíos.
const validarCamposObligatorios = (datos, campos) => {
    return campos.every((campo) => {
        const valor = datos[campo];

        return valor !== undefined &&
            valor !== null &&
            String(valor).trim() !== "";
    });
};

// Registra un nuevo usuario.
export const registrarUsuario = async (req, res) => {
    try {
        const camposObligatorios = [
            "nombres",
            "apellidos",
            "correo",
            "contrasena",
            "numero_telefono",
            "fecha_nacimiento"
        ];

        if (!validarCamposObligatorios(req.body, camposObligatorios)) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            });
        }

        const resultado = await usuarioServicio.registrarUsuario(req.body);

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        return res.status(201).json(resultado);

    } catch (error) {
        console.error("Error al registrar el usuario:", error);

        res.status(500).json({
            error: "Error al registrar el usuario."
        });
    }
};

// Actualiza los datos de un usuario.
export const actualizarUsuario = async (req, res) => {
    try {
        const camposObligatorios = [
            "nombres",
            "apellidos",
            "correo",
            "numero_telefono",
            "fecha_nacimiento"
        ];

        if (!validarCamposObligatorios(req.body, camposObligatorios)) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            });
        }

        const resultado = await usuarioServicio.actualizarUsuario(
            Number(req.params.id), req.body
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        return res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el usuario."
        });
    }
};

// Consulta un usuario mediante su identificador.
export const consultarUsuarioPorId = async (req, res) => {
    try {
        const resultado = await usuarioServicio.consultarUsuarioPorId(
            Number(req.params.id)
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        return res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Error al consultar el usuario."
        });
    }
};

// Obtiene todos los usuarios registrados.
export const listarUsuarios = async (req, res) => {
    try {
        const resultado = await usuarioServicio.listarUsuarios();

        return res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Error al consultar los usuarios."
        });
    }
};

// Obtiene el perfil del usuario autenticado.
export const obtenerPerfil = async (req, res) => {
    try {
        const resultado = await usuarioServicio.consultarUsuarioPorId(
            Number(req.usuario.id)
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        return res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el perfil."
        });
    }
};

// Elimina un usuario mediante su identificador.
export const eliminarUsuario = async (req, res) => {
    try {
        const resultado = await usuarioServicio.eliminarUsuario(
            Number(req.params.id)
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        return res.status(200).json({
            exito: resultado.exito,
            mensaje: "Usuario eliminado correctamente."
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el usuario."
        });
    }
};

// Actualiza la contraseña de un usuario.
export const actualizarContrasena = async (req, res) => {
    try {
        if (!validarCamposObligatorios(req.body, ["contrasena"])) {
            return res.status(400).json({
                error: "La contraseña es obligatoria."
            });
        }

        const resultado = await usuarioServicio.actualizarContrasena(
            Number(req.params.id), req.body.contrasena
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        return res.status(200).json({
            exito: resultado.exito,
            mensaje: "Contraseña actualizada correctamente."
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la contraseña."
        });
    }
};
