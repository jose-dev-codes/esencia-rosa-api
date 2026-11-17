// Importa las funciones del servicio de citas.
import * as citaServicio from "../services/citaServicio.js";

// Obtiene las citas del usuario autenticado y las devuelve en formato JSON.
export const listarCitas = async (req, res) => {
    try {
        const idUsuario = req.usuario.id_usuario || req.usuario.id;

        const citas = await citaServicio.obtenerTodasLasCitas(idUsuario);

        res.json(citas);
    } catch (error) {
        console.error("Error al obtener las citas", error);
        res.status(500).json({ error: "Error al obtener las citas." });
    }
};

// Obtiene la próxima cita del usuario autenticado.
export const obtenerProximaCita = async (req, res) => {
    try {
        const idUsuario = req.usuario.id_usuario || req.usuario.id;

        const cita = await citaServicio.obtenerProximaCita(idUsuario);

        res.json(cita);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener la próxima cita."
        });
    }
};

// Solicita al servicio la creación de una nueva cita.
export const crearCita = async (req, res) => {
    try {
        const { id_servicio, fecha, hora, id_especialista } = req.body;
        const id_usuario = req.usuario.id_usuario || req.usuario.id;

        const datosCita = {
            id_servicio,
            fecha,
            hora,
            id_especialista,
            id_usuario
        };

        const resultado = await citaServicio.crearCita(datosCita);

        if (resultado.servicioNoEncontrado) {
            return res.status(404).json({
                error: "Servicio no encontrado."
            });
        }

        if (resultado.especialistaNoEncontrado) {
            return res.status(404).json({
                error: "Especialista no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        res.status(201).json({
            mensaje: "Cita creada correctamente.",
            cita: resultado.cita
        });

    } catch (error) {
        console.error("Error al crear la cita:", error);
        res.status(500).json({ error: "Error al crear la cita." });
    }
};

// Solicita al servicio la actualización de una cita.
export const actualizarCita = async (req, res) => {
    try {
        const resultado = await citaServicio.editarCita(req.params.id, req.body);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada."
            });
        }

        if (resultado.especialistaNoEncontrado) {
            return res.status(404).json({
                error: "Especialista no encontrado."
            });
        }

        if (resultado.servicioNoEncontrado) {
            return res.status(404).json({
                error: "Servicio no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({ error: resultado.error });
        }

        res.json({
            mensaje: "Cita actualizada correctamente.",
            cita: resultado.citaActualizada
        });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cita." });
    }
};

// Solicita la cancelación de una cita según el identificador recibido en la URL.
export const cancelarCita = async (req, res) => {
    try {
        const resultado = await citaServicio.cancelarCita(req.params.id);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({ error: resultado.error });
        }

        res.json({
            mensaje: "Cita cancelada correctamente.",
            cita: resultado.citaCancelada
        });

    } catch (error) {
        console.error("Error al cancelar la cita", error);
        res.status(500).json({
            error: "Error al cancelar la cita."
        });
    }
};

// Solicita la eliminación de una cita según el identificador recibido en la URL.
export const eliminarCita = async (req, res) => {
    try {
        const resultado = await citaServicio.eliminarCita(req.params.id);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada."
            });
        }

        res.json({ mensaje: "Cita eliminada correctamente." });

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cita." });
    }
};

// Obtiene los especialistas de un servicio.
export const obtenerEspecialistasPorServicio = async (req, res) => {
    try {
        const especialistas = await citaServicio.obtenerEspecialistasPorServicio(
            req.params.idServicio
        );

        res.json(especialistas);
    } catch (error) {
        res.status(500).json({error: "Error al obtener los especialistas."});
    }
};

// Momentáneo: lista servicios, luego se mueve a servicio-controlador
export const listarServicios = async (req, res) => {
    try {
        const servicios = await citaServicio.listarServicios();

        res.json(servicios);
    } catch (error) {
        console.error("Error al obtener los servicios.", error);
        res.status(500).json({ error: "Error al obtener los servicios." });
    }
};

export const obtenerHorariosPorEspecialista = async (req, res) => {
    try {
        const idEspecialista = Number(req.params.idEspecialista);

        if (Number.isNaN(idEspecialista)) {
            return res.status(400).json({ mensaje: "Id de especialista no válido" });
        }

        const horarios = await citaServicio.obtenerHorariosPorEspecialista(
            idEspecialista
        );

        res.json(horarios);
    } catch (error) {
        console.error("Error al obtener los horarios del especialista.", error);
        res.status(500).json({
            error: "Error al obtener los horarios del especialista."
        });
    }
};

// Obtiene las horas libres de un especialista en una fecha para un servicio.
// Si viene excluirCita, ignora esa cita, para que sirva para actualizar.
export const obtenerHorasDisponibles = async (req, res) => {
    try {
        const idEspecialista = Number(req.query.id_especialista);
        const fecha = req.query.fecha;
        const idServicio = Number(req.query.id_servicio);
        const idCitaExcluir = req.query.excluirCita
            ? Number(req.query.excluirCita)
            : null;

        if (
            Number.isNaN(idEspecialista) ||
            Number.isNaN(idServicio) ||
            !fecha
        ) {
            return res.status(400).json({
                error: "Faltan datos para obtener las horas disponibles."
            });
        }

        const resultado = await citaServicio.obtenerHorasDisponibles(
            idEspecialista,
            fecha,
            idServicio,
            idCitaExcluir
        );

        if (resultado.servicioNoEncontrado) {
            return res.status(404).json({
                error: "Servicio no encontrado."
            });
        }

        if (resultado.especialistaNoEncontrado) {
            return res.status(404).json({
                error: "Especialista no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        res.json(resultado.horas);

    } catch (error) {
        console.error("Error al obtener las horas disponibles.", error);
        res.status(500).json({
            error: "Error al obtener las horas disponibles."
        });
    }
};

// Obtiene los días de un mes que tienen al menos una hora libre.
// anio y mes vienen en query, mes de 1 a 12.
export const obtenerDiasDisponibles = async (req, res) => {
    try {
        const idEspecialista = Number(req.query.id_especialista);
        const idServicio = Number(req.query.id_servicio);
        const anio = Number(req.query.anio);
        const mes = Number(req.query.mes);
        const idCitaExcluir = req.query.excluirCita
            ? Number(req.query.excluirCita)
            : null;

        if (
            Number.isNaN(idEspecialista) ||
            Number.isNaN(idServicio) ||
            Number.isNaN(anio) ||
            Number.isNaN(mes)
        ) {
            return res.status(400).json({
                error: "Faltan datos para obtener los días disponibles."
            });
        }

        const resultado = await citaServicio.obtenerDiasDisponibles(
            idEspecialista,
            idServicio,
            anio,
            mes,
            idCitaExcluir
        );

        if (resultado.servicioNoEncontrado) {
            return res.status(404).json({
                error: "Servicio no encontrado."
            });
        }

        if (resultado.especialistaNoEncontrado) {
            return res.status(404).json({
                error: "Especialista no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        res.json(resultado.dias);

    } catch (error) {
        console.error("Error al obtener los días disponibles.", error);
        res.status(500).json({
            error: "Error al obtener los días disponibles."
        });
    }
};
