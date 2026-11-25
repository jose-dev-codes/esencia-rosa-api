import * as servicioServicio from "../services/servicioServicio.js";

const responderServicio = (res, resultado) => {
    if (resultado.servicioNoEncontrado) {
        return res.status(404).json({ error: "Servicio no encontrado." });
    }

    if (!resultado.exito) {
        return res.status(400).json({ error: resultado.error });
    }

    res.json(resultado.servicio);
};

export const listarServicios = async (req, res) => {
    try {
        const rolUsuario = req.usuario.rol;

        const servicios = await servicioServicio.listarServicios(rolUsuario);

        res.json(servicios);

    } catch (error) {
        console.error("Error al obtener los servicios.", error);
        res.status(500).json({ error: "Error al obtener los servicios." });
    }

};

export const obtenerEspecialistasPorServicio = async (req, res) => {
    try {
        const { idServicio } = req.params;
        const rolUsuario = req.usuario.rol;

        const resultado = await servicioServicio.obtenerEspecialistasPorServicio(
            idServicio, rolUsuario
        );

        if (!resultado.exito) {
            if (resultado.servicioNoEncontrado) {
                return res.status(404).json({ error: "Servicio no encontrado." })
            }
            return res.status(403).json({ error: resultado.error })
        }

        res.json(resultado.especialistas);

    } catch (error) {
        console.error("Error al obtener los especialistas de este servicio.", error);
        res.status(500).json({
            error: "Error al obtener los especialistas de este servicio."
        });
    }

};

// Crea un nuevo servicio.
// Solo admin, eso lo revisa el middleware verificarEsAdmin.
export const crearServicio = async (req, res) => {
    try {
        const resultado = await servicioServicio.crearServicio(req.body);

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            })
        }

        res.status(201).json(resultado.servicio);

    } catch (error) {
        console.error("Error al crear el servicio", error);
        res.status(500).json({ error: "Error al crear el servicio." });
    }
};

export const actualizarServicio = async (req, res) => {
    try {
        const idServicio = Number(req.params.idServicio);
        const { rol } = req.usuario;

        const resultado = await servicioServicio.actualizarServicio(
            idServicio, rol, req.body
        );

        responderServicio(res, resultado);

    } catch (error) {
        console.error("Error al actualizar el servicio", error);
        res.status(500).json({error: "Error al actualizar el servicio."});
    }
};

export const eliminarServicio = async (req, res) => {
    try {
        const idServicio = Number(req.params.idServicio);
        const { rol } = req.usuario;
        const resultado = await servicioServicio.eliminarServicio(idServicio, rol);

        responderServicio(res, resultado);

    } catch (error) {
        console.error("Error al eliminar el servicio.", error);
        res.status(500).json({
            error: "Error al eliminar el servicio."
        });
    }

};

export const inhabilitarServicio = async (req, res) => {
    try {
        const idServicio = Number(req.params.idServicio);
        const { rol } = req.usuario;

        const resultado = await servicioServicio.inhabilitarServicio(idServicio, rol);

        responderServicio(res, resultado);

    } catch (error) {
        console.error("Error al inhabilitar el servicio.", error);
        res.status(500).json({
            error: "Error al inhabilitar el servicio."
        });
    }

};

export const habilitarServicio = async (req, res) => {
    try {
        const idServicio = Number(req.params.idServicio);
        const { rol } = req.usuario;

        const resultado = await servicioServicio.habilitarServicio(idServicio, rol);

        responderServicio(res, resultado);

    } catch (error) {
        console.error("Error al habilitar el servicio.", error);
        res.status(500).json({
            error: "Error al habilitar el servicio."
        });
    }
};
