// Permite continuar solo si el usuario autenticado es el propietario del recurso o un administrador.
export const verificarPropietario = (req, res, next) => {
    const esPropietario = req.usuario.id === Number(req.params.id);
    const esAdmin = req.usuario.rol === "admin";

    if (!esPropietario && !esAdmin) {
        return res.status(403).json({
            error: "Usted no tiene autorización."
        });
    }

    next();
};
