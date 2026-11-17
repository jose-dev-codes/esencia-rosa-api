// Importa Express para crear el enrutador de la API.
import express from "express";

// Importa las funciones del controlador de citas.
import * as citaControlador from "../controllers/citaControlador.js";

// Importa el middleware encargado de verificar el token JWT.
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";

import { verificarPropietarioCita } from "../middlewares/verificarPropietarioCita.js";

import { validarCita } from "../middlewares/validarCita.js";

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Define las rutas de citas y protege cada operación según corresponda.
router.get("/", verificarAutenticacion, citaControlador.listarCitas);
router.get("/proxima", verificarAutenticacion, citaControlador.obtenerProximaCita);
router.get(
    "/servicios/:idServicio/especialistas",
    verificarAutenticacion,
    citaControlador.obtenerEspecialistasPorServicio
);

router.get(
    "/especialistas/:idEspecialista/horarios",
    verificarAutenticacion,
    citaControlador.obtenerHorariosPorEspecialista
);

router.get(
    "/horas-disponibles",
    verificarAutenticacion,
    citaControlador.obtenerHorasDisponibles
);

router.get(
    "/dias-disponibles",
    verificarAutenticacion,
    citaControlador.obtenerDiasDisponibles
);

router.post(
    "/",
    verificarAutenticacion,
    validarCita,
    citaControlador.crearCita
);

router.put(
    "/:id",
    verificarAutenticacion,
    verificarPropietarioCita,
    validarCita,
    citaControlador.actualizarCita
);

router.patch(
    "/:id/cancelar",
    verificarAutenticacion,
    verificarPropietarioCita,
    citaControlador.cancelarCita
);

router.delete(
    "/:id",
    verificarAutenticacion,
    verificarPropietarioCita,
    citaControlador.eliminarCita
);

router.get('/servicios', verificarAutenticacion, citaControlador.listarServicios);

export default router;
