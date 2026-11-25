// Importa todas las operaciones de acceso a datos del modelo de citas.
import * as citaModelo from "../models/citaModelo.js";
import * as servicioModelo from "../models/servicioModelo.js";
import * as usuarioModelo from "../models/usuarioModelo.js";
import * as horarioModelo from "../models/horarioModelo.js";

import { obtenerFechaActual } from "../utils/validacionUtilidades.js";
import {
    horaAMinutos,
    minutosAHora
} from "../utils/tiempoUtilidades.js";

// Obtiene todas las citas del usuario autenticado.
export const obtenerTodasLasCitas = (idUsuario) => {
    return citaModelo.obtenerTodasLasCitas(idUsuario);
};

// Obtiene la próxima cita del usuario.
export const obtenerProximaCita = async (idUsuario) => {
    return await citaModelo.obtenerProximaCita(idUsuario);
};

// Valida que el especialista exista, sea especialista y esté activo.
const validarEspecialista = async (id_especialista) => {
    const especialista = await usuarioModelo.buscarUsuarioPorId(id_especialista);

    if (!especialista) {
        return {
            exito: false,
            especialistaNoEncontrado: true
        };
    }

    if (
        especialista.rol !== "especialista" &&
        especialista.rol !== "admin"
    ) {
        return {
            exito: false,
            error: "El usuario seleccionado no es un especialista."
        };
    }

    if (especialista.estado !== "activo") {
        return {
            exito: false,
            error: "El especialista no está activo."
        };
    }

    return {
        exito: true,
        especialista
    };
};

// Valida que el servicio exista y esté activo.
const validarServicio = async (id_servicio) => {
    const servicio = await servicioModelo.buscarServicioPorId(id_servicio);

    if (!servicio) {
        return {
            exito: false,
            servicioNoEncontrado: true
        };
    }

    if (servicio.estado !== "activo") {
        return {
            exito: false,
            error: "El servicio no está activo."
        };
    }

    return {
        exito: true,
        servicio
    };
};

const validarCita = async (id, accion) => {
    const cita = await citaModelo.buscarCitaPorId(id);

    if (!cita) {
        return {
            exito: false,
            noEncontrada: true
        };
    }

    if (cita.estado === "cancelada") {
        return {
            exito: false,
            error: `No se puede ${accion} una cita cancelada.`
        };
    }

    if (cita.estado === "completada") {
        return {
            exito: false,
            error: `No se puede ${accion} una cita completada.`
        };
    }

    return {
        exito: true,
        cita
    };
};

// Revisa si fecha + hora ya pasaron.
const esFechaHoraPasada = (fecha, hora) => {
    const fechaActual = obtenerFechaActual();
    if (fecha < fechaActual) return true;
    if (fecha > fechaActual) return false;

    // Si es hoy, revisa la hora
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const horaActual = `${horas}:${minutos}`;
    return hora <= horaActual;
};

// Convierte una fecha YYYY-MM-DD a día ISO: 1 = Lunes, 7 = Domingo.
const obtenerDiaSemanaISO = (fecha) => {
    const dia = new Date(`${fecha}T12:00:00`).getDay();
    if (dia === 0) return 7;
    return dia;
};

// Valida y crea una nueva cita.
export const crearCita = async (datos) => {
    const { id_servicio, fecha, hora, id_especialista } = datos;

    if (esFechaHoraPasada(fecha, hora)) {
        return {
            exito: false,
            error: "No se puede crear una cita con una fecha u hora pasada."
        };
    }

    const validacionServicio = await validarServicio(id_servicio);

    if (!validacionServicio.exito) return validacionServicio;

    const servicio = validacionServicio.servicio;

    const validacionEspecialista = await validarEspecialista(id_especialista);

    if (!validacionEspecialista.exito) {
        return validacionEspecialista;
    }

    const haceServicio = await servicioModelo.verificarEspecialistaHaceServicio(
        id_especialista, id_servicio
    );

    if (!haceServicio) {
        return {
            exito: false,
            error: "El especialista no ofrece este servicio."
        };
    }

    const diaSemana = obtenerDiaSemanaISO(fecha);
    const horario = await horarioModelo.buscarHorarioPorEspecialistaYDia(
        id_especialista, diaSemana
    );

    if (!horario) {
        return {
            exito: false,
            error: "El especialista no trabaja ese día."
        };
    }

    if (hora < horario.hora_inicio || hora >= horario.hora_fin) {
        return {
            exito: false,
            error: "La hora está fuera del horario del especialista."
        }
    }

    const citaExistente = await citaModelo.buscarCitaExistente(
        fecha, hora, id_especialista, servicio.duracion_minutos
    );

    if (citaExistente) {
        return {
            exito: false,
            error: "El especialista ya tiene una cita en esa fecha y hora."
        };
    }

    const cita = await citaModelo.crearCita(datos);

    return {
        exito: true,
        cita
    };
};

// Valida y actualiza la fecha, la hora y el especialista de una cita.
export const editarCita = async (id, datos) => {
    const { fecha, hora, id_especialista } = datos;

    const validacionCita = await validarCita(id, "editar");

    if (!validacionCita.exito) return validacionCita;

    const cita = validacionCita.cita;

    const validacionServicio = await validarServicio(cita.id_servicio);

    if (!validacionServicio.exito) return validacionServicio;

    if (esFechaHoraPasada(fecha, hora)) {
        return {
            exito: false,
            error: "No se puede actualizar una cita a una fecha u hora pasada."
        };
    }

    const validacionEspecialista = await validarEspecialista(id_especialista);

    if (!validacionEspecialista.exito) {
        return validacionEspecialista;
    }

    const haceServicio = await servicioModelo.verificarEspecialistaHaceServicio(
        id_especialista, cita.id_servicio
    );

    if (!haceServicio) {
        return {
            exito: false,
            error: "El especialista no ofrece este servicio."
        };
    }

    const diaSemana = obtenerDiaSemanaISO(fecha);
    const horario = await horarioModelo.buscarHorarioPorEspecialistaYDia(
        id_especialista, diaSemana
    );

    if (!horario) {
        return {
            exito: false,
            error: "El especialista no trabaja ese día."
        };
    }

    if (hora < horario.hora_inicio || hora >= horario.hora_fin) {
        return {
            exito: false,
            error: "La hora está fuera del horario del especialista."
        };
    }

    const citaExistente = await citaModelo.buscarCitaExistente(
        fecha, hora, id_especialista, cita.duracion_reservada, id
    );

    if (citaExistente) {
        return {
            exito: false,
            error: "El especialista ya tiene una cita en esa fecha y hora."
        };
    }

    const citaActualizada = await citaModelo.editarCita(id, datos);

    return {
        exito: true,
        citaActualizada
    };
};

// Cancela una cita y devuelve el resultado de la operación.
export const cancelarCita = async (id) => {
    const validacionCita = await validarCita(id, "cancelar");

    if (!validacionCita.exito) return validacionCita;

    const citaCancelada = await citaModelo.cancelarCita(id);

    return {
        exito: true,
        citaCancelada
    };
};

// Elimina una cita según su identificador.
export const eliminarCita = async (id) => {
    const cita = await citaModelo.eliminarCita(id);

    if (!cita) {
        return {
            exito: false,
            noEncontrada: true
        };
    }

    return {
        exito: true,
        cita
    };
};

export const obtenerHorariosPorEspecialista = async (idEspecialista) => {
    return await citaModelo.buscarHorariosPorEspecialista(idEspecialista);
};

// Obtiene las horas libres de un especialista en una fecha para un servicio.
// Calcula los huecos libres con hora_inicio y hora_fin,
// resta las citas ocupadas, y genera intervalos con duracion_minutos.
// Si se pasa idCitaExcluir, ignora esa cita, para que sirva para actualizar.
export const obtenerHorasDisponibles = async (
    id_especialista,
    fecha,
    id_servicio,
    idCitaExcluir = null
) => {
    const validacionServicio = await validarServicio(id_servicio);

    if (!validacionServicio.exito) return validacionServicio;

    const servicio = validacionServicio.servicio;

    const validacionEspecialista = await validarEspecialista(id_especialista);

    if (!validacionEspecialista.exito) return validacionEspecialista;

    const diaSemana = obtenerDiaSemanaISO(fecha);

    const horario = await horarioModelo.buscarHorarioPorEspecialistaYDia(
        id_especialista,
        diaSemana
    );

    if (!horario) {
        return {
            exito: true,
            horas: []
        };
    }

    const citasOcupadas = await citaModelo.buscarCitasOcupadasPorEspecialistaYFecha(
        id_especialista,
        fecha
    );

    const duracion = servicio.duracion_minutos;

    const inicioDia = horaAMinutos(horario.hora_inicio);
    const finDia = horaAMinutos(horario.hora_fin);

    const ocupadas = citasOcupadas
        .filter((cita) => cita.id_cita !== idCitaExcluir)
        .map((cita) => {
            const inicio = horaAMinutos(cita.hora);
            const fin = inicio + cita.duracion_reservada;

            return { inicio, fin };
        })
        .sort((a, b) => a.inicio - b.inicio);

    const horas = [];
    let cursor = inicioDia;

    while (cursor + duracion <= finDia) {
        const finSlot = cursor + duracion;

        const ocupadaQueChoca = ocupadas.find(
            (ocupada) =>
                cursor < ocupada.fin &&
                finSlot > ocupada.inicio
        );

        if (ocupadaQueChoca) {
            cursor = ocupadaQueChoca.fin;
            continue;
        }

        horas.push(minutosAHora(cursor));
        cursor = finSlot;
    }

    return {
        exito: true,
        horas
    };
};

// Obtiene los días de un mes que tienen al menos una hora libre.
// Sirve para pintar el calendario del front.
// Reutiliza obtenerHorasDisponibles, para no duplicar el cálculo de huecos.
export const obtenerDiasDisponibles = async (
    id_especialista,
    id_servicio,
    anio,
    mes,
    idCitaExcluir = null
) => {
    const validacionServicio = await validarServicio(id_servicio);

    if (!validacionServicio.exito) return validacionServicio;

    const validacionEspecialista = await validarEspecialista(id_especialista);

    if (!validacionEspecialista.exito) return validacionEspecialista;

    const diasDelMes = new Date(anio, mes, 0).getDate();

    const dias = [];

    for (let dia = 1; dia <= diasDelMes; dia++) {
        const fecha =
            `${anio}-` +
            `${String(mes).padStart(2, "0")}-` +
            `${String(dia).padStart(2, "0")}`;

        const resultado = await obtenerHorasDisponibles(
            id_especialista,
            fecha,
            id_servicio,
            idCitaExcluir
        );

        if (resultado.exito && resultado.horas.length > 0) {
            dias.push(dia);
        }
    }

    return {
        exito: true,
        dias
    };
};
