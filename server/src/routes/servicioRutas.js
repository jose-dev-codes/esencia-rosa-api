import { Router } from "express";
import * as servicioControlador from "../controllers/servicioControlador.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";
import { validarDatosServicio } from "../middlewares/validarDatosServicio.js";
import { verificarAdministrador } from "../middlewares/verificarAdministrador.js";

const router = Router();

// Listar servicios, todos los roles.
router.get("/", verificarAutenticacion, servicioControlador.listarServicios);

// Especialistas de un servicio, todos los roles.
router.get(
    "/:idServicio/especialistas",
    verificarAutenticacion,
    servicioControlador.obtenerEspecialistasPorServicio
);

// Crear servicio, solo admin + validar datos.
router.post(
    "/",
    verificarAutenticacion,
    verificarAdministrador,
    validarDatosServicio,
    servicioControlador.crearServicio
);

// Actualizar servicio, solo admin + validar datos.
router.put(
    "/:idServicio",
    verificarAutenticacion,
    verificarAdministrador,
    validarDatosServicio,
    servicioControlador.actualizarServicio
);

// Eliminar servicio, solo admin, sin citas.
router.delete(
    "/:idServicio",
    verificarAutenticacion,
    verificarAdministrador,
    servicioControlador.eliminarServicio
);

// Inhabilitar servicio, solo admin.
router.patch(
    "/:idServicio/inhabilitar",
    verificarAutenticacion,
    verificarAdministrador,
    servicioControlador.inhabilitarServicio
);

// Habilitar servicio, solo admin.
router.patch(
    "/:idServicio/habilitar",
    verificarAutenticacion,
    verificarAdministrador,
    servicioControlador.habilitarServicio
);

export default router;
