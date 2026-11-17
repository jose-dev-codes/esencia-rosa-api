import { buscarCitaPorId } from "../models/citaModelo.js";

export const verificarPropietarioCita = async (req, res, next) => {
    try {
        const cita = await buscarCitaPorId(req.params.id);

        if (!cita) {
            return res.status(404).json({
                error: "Cita no encontrada."
            });
        }

        const idUsuario = req.usuario.id_usuario || req.usuario.id;
        const esPropietarioCita = idUsuario === cita.id_usuario;
        const esAdmin = req.usuario.rol === "admin";

        if (!esPropietarioCita && !esAdmin) {
            return res.status(403).json({
                error: "Usuario no autorizado."
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            error: "Error al verificar la propiedad de la cita."
        });
    }
};
