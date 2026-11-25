import { obtenerError } from "../utils/validacionUtilidades.js";

const validarDatoNumerico = (dato, nombreCampo) => {
    const requisitosDato = [
        {
            condicion: typeof dato === "number",
            mensaje: `${nombreCampo} solo debe tener números.`
        },
        {
            condicion: Number(dato) > 0,
            mensaje: `${nombreCampo} debe ser mayor a cero.`
        }
    ];

    return obtenerError(requisitosDato);

};

export const validarDatosServicio = (req, res, next) => {
    const { nombre, descripcion, costo, duracion_minutos} = req.body;
    const { idServicio } = req.params;

    if (req.method === "PUT") {
        if (!Number.isInteger(Number(idServicio))) {
            return res.status(400).json({
                error: "El identificador del servicio debe ser un número entero."
            });
        }
    }

    if (typeof nombre !== "string") {
        return res.status(400).json({
            error: "El nombre debe ser un texto."
        });
    }
    const requisitosNombreServicio = [
        {
            condicion: nombre.trim().length > 0,
            mensaje: "El nombre del servicio es obligatorio."
        },
        {
            condicion: nombre.trim().length >= 3,
            mensaje: "El nombre debe tener mínimo tres carateres."
        },
        {
            condicion: nombre.trim().length <= 50,
            mensaje: "El nombre debe tener máximo 50 caracteres."
        }
    ];

    const errorNombreServicio = obtenerError(requisitosNombreServicio);

    if (errorNombreServicio) {
        return res.status(400).json({
            error: errorNombreServicio
        });
    }

    if (typeof descripcion !== "string") {
        return res.status(400).json({
            error: "La descripcion debe ser un texto."
        });
    }

    const requisitosDescripcionServicio = [
        {
            condicion: descripcion.trim().length > 0,
            mensaje: "La descripción es obligatoria."
        },
        {
            condicion: descripcion.trim().length >= 5,
            mensaje: "La descripción debe tener al menos 5 caracteres."
        },
        {
            condicion: descripcion.trim().length <= 500,
            mensaje: "La descripción debe tener máximo 500 caracteres."
        }
    ];

    const errorDescripcionServicio = obtenerError(requisitosDescripcionServicio);

    if (errorDescripcionServicio) {
        return res.status(400).json({
            error: errorDescripcionServicio
        });
    }

    const errorCosto = validarDatoNumerico(costo, "El costo");

    if (errorCosto) {
        return res.status(400).json({
            error: errorCosto
        });
    }

    if (Number(costo) > 99999999.99) {
        return res.status(400).json({
            error: "El costo no puede ser mayor a 99999999.99."
        });
    }

    const errorDuracion = validarDatoNumerico(duracion_minutos, "La duración");

    if (errorDuracion) {
        return res.status(400).json({
            error: errorDuracion
        });
    }

    if (!Number.isInteger(duracion_minutos)) {
        return res.status(400).json({
            error: "La duración debe ser un número entero."
        });
    }

    next();
};
