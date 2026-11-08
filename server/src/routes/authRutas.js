import { Router } from "express";
import { iniciarSesion, cerrarSesion } from "../controllers/authControlador.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";

// Crea el enrutador de autenticación.
const router = Router();

// Define la ruta de inicio de sesión.
router.post("/login", iniciarSesion);

// Define la ruta protegida para cerrar sesión.
router.post("/logout", verificarAutenticacion, cerrarSesion);

// Exporta las rutas de autenticación.
export default router;
