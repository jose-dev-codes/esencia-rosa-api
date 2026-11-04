import * as usuarioControlador from "../controllers/usuarioControlador.js";

// Importa el enrutador de Express.
import { Router } from "express";

// Crea el enrutador de usuarios.
const router = Router();

// Registra un nuevo usuario.
router.post("/", usuarioControlador.registrarUsuario);

// Obtiene todos los usuarios registrados.
router.get("/", usuarioControlador.listarUsuarios);

// Obtiene el perfil del usuario autenticado.
router.get("/perfil", usuarioControlador.obtenerPerfil);

// Consulta un usuario mediante su identificador.
router.get("/:id", usuarioControlador.consultarUsuarioPorId);

// Actualiza los datos de un usuario.
router.put("/:id", usuarioControlador.actualizarUsuario);

// Elimina un usuario mediante su identificador.
router.delete("/:id", usuarioControlador.eliminarUsuario);

// Actualiza la contraseña de un usuario.
router.patch("/:id/contrasena", usuarioControlador.actualizarContrasena);

// Exporta las rutas de usuarios.
export default router;
