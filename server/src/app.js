// Importa Express.
import express from "express";

// Importa el middleware CORS.
import cors from "cors";

// Importa las rutas de usuarios.
import usuarioRutas from "./routes/usuarioRutas.js";

// Importa las rutas de autenticación.
import authRutas from "./routes/authRutas.js";

// Importa las rutas de citas
import citaRutas from "./routes/citaRutas.js";

// Importa las rutas de servicios.
import servicioRutas from "./routes/servicioRutas.js";

// Crea la aplicación de Express.
const app = express();

// Permite solicitudes desde otros orígenes.
app.use(cors());

// Permite recibir y procesar datos JSON.
app.use(express.json());

// Registra las rutas del módulo de usuarios.
app.use("/api/usuarios", usuarioRutas);

// Registra las rutas del módulo de autenticación.
app.use("/api/auth", authRutas);

// Registra las rutas del módulo de citas.
app.use("/api/citas", citaRutas);

// Registra las rutas del módulo de servicios.
app.use("/api/servicios", servicioRutas);

// Define una ruta básica para comprobar que la API funciona.
app.get("/", (req, res) => {
    res.json({
        exito: true,
        mensaje: "API de Esencia Rosa funcionando."
    });
});

// Exporta la aplicación para iniciar el servidor desde index.js.
export default app;
