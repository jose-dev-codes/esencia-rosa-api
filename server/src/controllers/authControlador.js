// Importa jsonwebtoken para generar el token de autenticación.
import jwt from "jsonwebtoken";

// Importa la función que genera un identificador único para cada token.
import { randomUUID } from "node:crypto";

// Importa el servicio de autenticación para validar las credenciales del usuario.
import * as authServicio from "../services/authServicio.js";

// Inicia sesión y devuelve un token JWT.
export const iniciarSesion = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (
            typeof correo !== "string" ||
            typeof contrasena !== "string" ||
            !correo.trim() ||
            !contrasena
        ) {
            return res.status(400).json({
                error: "El correo y la contraseña son obligatorios."
            });
        }

        const resultado = await authServicio.validarCredenciales(
            correo.trim(),
            contrasena
        );

        // Respuesta genérica para no revelar si el correo está registrado.
        if (!resultado) {
            return res.status(401).json({
                error: "Correo o contraseña incorrectos."
            });
        }

        const { usuario } = resultado;

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
                jwtid: randomUUID()
            }
        );

        // Devuelve los datos del usuario y el token generado.
        return res.status(200).json({
            exito: true,
            token: `Bearer ${token}`,
            usuario
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        res.status(500).json({
            error: "Error al iniciar sesión."
        });
    }
};

// Cierra la sesión del usuario revocando el token utilizado.
export const cerrarSesion = async (req, res) => {
    try {
        // Obtiene el identificador y la fecha de expiración del token autenticado.
        const { jti, exp } = req.usuario;

        // Verifica que el token contenga los datos necesarios para revocarlo.
        if (!jti || !exp) {
            return res.status(400).json({
                error: "El token no contiene los datos necesarios para cerrar sesión."
            });
        }

        // Registra el token como revocado mediante el servicio de autenticación.
        await authServicio.cerrarSesion(jti, new Date(exp * 1000));

        return res.status(200).json({
            mensaje: "Sesión cerrada correctamente."
        });

    } catch (error) {
        // Responde con un error interno si ocurre un problema durante el proceso.
        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};
