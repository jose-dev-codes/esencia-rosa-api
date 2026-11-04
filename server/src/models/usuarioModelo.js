// Importa el pool de conexiones para realizar consultas a PostgreSQL.
import pool from "../config/db.js";

// Busca un usuario mediante su correo electrónico.
export const obtenerUsuarioPorCorreo = async (correo) => {
    const resultado = await pool.query(
        `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            contrasena,
            numero_telefono,
            fecha_nacimiento,
            rol,
            estado
        FROM usuarios
        WHERE LOWER(correo) = LOWER($1)
        `,
        [correo]
    );

    return resultado.rows[0] || null;
};

// Crea un nuevo usuario y devuelve sus datos sin incluir la contraseña.
export const crearUsuario = async (datos) => {
    const {
        nombres,
        apellidos,
        correo,
        contrasena,
        numero_telefono,
        fecha_nacimiento
    } = datos;

    const resultado = await pool.query(
        `
        INSERT INTO usuarios (
            nombres,
            apellidos,
            correo,
            contrasena,
            numero_telefono,
            fecha_nacimiento
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento,
            rol,
            estado;
        `,
        [
            nombres,
            apellidos,
            correo,
            contrasena,
            numero_telefono,
            fecha_nacimiento
        ]
    );

    return resultado.rows[0];
};

// Actualiza los datos de un usuario según su identificador.
export const actualizarUsuario = async (id, datos) => {
    const {
        nombres,
        apellidos,
        correo,
        numero_telefono,
        fecha_nacimiento
    } = datos;

    const resultado = await pool.query(
        `
        UPDATE usuarios
        SET nombres = $1,
            apellidos = $2,
            correo = $3,
            numero_telefono = $4,
            fecha_nacimiento = $5
        WHERE id_usuario = $6
        RETURNING
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento,
            rol,
            estado;
        `,
        [nombres, apellidos, correo, numero_telefono, fecha_nacimiento, id]
    );

    return resultado.rows[0] || null;
};

// Busca un usuario mediante su identificador.
export const buscarUsuarioPorId = async (id) => {
    const resultado = await pool.query(
        `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento,
            rol,
            estado
        FROM usuarios
        WHERE id_usuario = $1;
        `,
        [id]
    );

    return resultado.rows[0] || null;
};

// Obtiene todos los usuarios registrados.
export const listarUsuarios = async () => {
    const resultado = await pool.query(
        `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento,
            rol,
            estado
        FROM usuarios
        ORDER BY id_usuario ASC;
        `
    );

    return resultado.rows;
};

// Elimina un usuario de la base de datos mediante su identificador.
export const eliminarUsuario = async (id) => {
    const resultado = await pool.query(
        `
        DELETE FROM usuarios
        WHERE id_usuario = $1;
        `,
        [id]
    );

    return resultado.rowCount;
};

// Actualiza la contraseña de un usuario mediante su identificador.
export const actualizarContrasena = async (id, contrasena) => {
    const resultado = await pool.query(
        `
        UPDATE usuarios
        SET contrasena = $1
        WHERE id_usuario = $2;
        `,
        [contrasena, id]
    );

    return resultado.rowCount;
};
