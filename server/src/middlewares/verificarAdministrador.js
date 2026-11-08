// Permite continuar solo si el usuario autenticado tiene el rol de administrador.
export const verificarAdministrador = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      error: "Usted no tiene autorización."
    });
  }

  next();
};
