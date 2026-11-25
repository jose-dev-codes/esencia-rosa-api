import * as servicioModelo from "../models/servicioModelo.js"

// Valida que el servicio exista y esté activo.
const validarServicio = async (idServicio, rolUsuario) => {
    const servicio = await servicioModelo.buscarServicioPorId(idServicio);

    if (!servicio) {
        return {
            exito: false,
            servicioNoEncontrado: true
        };
    }

    if (
        servicio.estado !== "activo" &&
        (rolUsuario === "cliente" || rolUsuario === "especialista")) {
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

// Obtiene los servicios disponibles
export const listarServicios = (rolUsuario) => {
    if (rolUsuario === "cliente" || rolUsuario === "especialista") {
        return servicioModelo.obtenerServiciosActivos();
    }

    return servicioModelo.obtenerTodosLosServicios();
};

// Obtiene los especialistas que ofrecen un servicio.
export const obtenerEspecialistasPorServicio = async (idServicio, rolUsuario) => {
    const validacionServicio = await validarServicio(idServicio, rolUsuario);

    if (!validacionServicio.exito) return validacionServicio;

    const especialistas = await servicioModelo.buscarEspecialistaPorServicio(
        idServicio
    );

    return {
        exito: true,
        especialistas
    };
};

// Crea un nuevo servicio.
export const crearServicio = async (datos) => {
    const { nombre } = datos;
    const resultado = await servicioModelo.buscarServicioPorNombre(nombre);

    if (resultado) {
        return {
            exito: false,
            error: "Ya existe un servicio con este nombre."
        }
    }
    const servicio = await servicioModelo.crearServicio(datos);

    return {
        exito: true,
        servicio
    };
};

// Actualza un servicio a través del modelo
export const actualizarServicio = async (idServicio, rol, datos) => {
    const { nombre } = datos;

    const validacionServicio = await validarServicio(idServicio, rol)

    if (!validacionServicio.exito) return validacionServicio;

    const existeNombre = await servicioModelo.buscarServicioPorNombre(
        nombre, idServicio
    );

    if (existeNombre) {
        return {
            exito: false,
            error: "Ya existe un servicio con este nombre."
        }
    }

    const servicio = await servicioModelo.actualizarServicio(idServicio, datos);

    return {
        exito: true,
        servicio
    }
};

// Elimina un servcio a través del modelo
export const eliminarServicio = async (idServicio, rol) => {
    const validacionServicio = await validarServicio(idServicio, rol);

    if (!validacionServicio.exito) return validacionServicio;

    const totalCitas = await servicioModelo.contarCitasPorServicio(idServicio);

    if (totalCitas > 0) {
        return {
            exito: false,
            error: "No se puede eliminar el servicio porque tiene citas asociadas."
        };
    }

    const servicio = await servicioModelo.eliminarServicio(idServicio);

    return {
        exito: true,
        servicio
    };
};

// Habilita un servicio, lo vuelve a dejar en 'activo'.
// Para volver a ofrecerlo cuando vuelva el especialista.
export const habilitarServicio = async (idServicio, rol) => {
    const validacionServicio = await validarServicio(idServicio, rol);

    if (!validacionServicio.exito) return validacionServicio;

    if (validacionServicio.servicio.estado === 'activo') {
        return {
            exito: false,
            error: "El servicio ya está activo."
        };
    }

    const servicio = await servicioModelo.habilitarServicio(idServicio);

    return {
        exito: true,
        servicio
    };
};

// Inhabilita un servicio, lo deja en 'inactivo'.
// Solo para dejarlo fuera sin borrarlo, por si vuelve el especialista.
// Si el servicio no existe, devuelve el error de validarServicio.
export const inhabilitarServicio = async (idServicio, rol) => {
    const validacionServicio = await validarServicio(idServicio, rol);

    if (!validacionServicio.exito) return validacionServicio;

    if (validacionServicio.servicio.estado === 'inactivo') {
        return {
            exito: false,
            error: "El servicio ya está inactivo."
        };
    }

    const servicio = await servicioModelo.inhabilitarServicio(idServicio);

    return {
        exito: true,
        servicio
    };
};
