import * as usuarioControlador from "../controllers/usuarioControlador.js";

// Importa el enrutador de Express.
import { Router } from "express";

import { verificarAutenticacion } from "../middlewares/authMiddleware.js";
import { verificarPropietario } from "../middlewares/verificarPropietario.js";
import { verificarAdministrador } from "../middlewares/verificarAdministrador.js";
import { validarUsuario, validarContrasena } from "../middlewares/validarUsuario.js";

// Crea el enrutador de usuarios.
const router = Router();

// Registra un nuevo usuario.
router.post(
    "/",
    validarUsuario,
    validarContrasena,
    usuarioControlador.registrarUsuario
);

// Obtiene todos los usuarios registrados.
router.get(
    "/",
    verificarAutenticacion,
    verificarAdministrador,
    usuarioControlador.listarUsuarios
);

// Obtiene el perfil del usuario autenticado.
router.get(
    "/perfil",
    verificarAutenticacion,
    usuarioControlador.obtenerPerfil
);

// Consulta un usuario mediante su identificador.
router.get(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    usuarioControlador.consultarUsuarioPorId
);

// Actualiza los datos de un usuario.
router.put(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    validarUsuario,
    usuarioControlador.actualizarUsuario
);

// Elimina un usuario mediante su identificador.
router.delete(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    usuarioControlador.eliminarUsuario
);

// Actualiza la contraseña de un usuario.
router.patch(
    "/:id/contrasena",
    verificarAutenticacion,
    verificarPropietario,
    validarContrasena,
    usuarioControlador.actualizarContrasena
);

// Exporta las rutas de usuarios.
export default router;
