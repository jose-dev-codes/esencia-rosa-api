// Carga las variables de entorno.
import "dotenv/config";

// Importa la aplicación de Express.
import app from "./src/app.js";

// Obtiene el puerto configurado en las variables de entorno.
const PORT = process.env.PORT || 3000;

// Inicia el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
