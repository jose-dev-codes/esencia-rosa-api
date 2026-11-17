// Importa el pool de conexiones a PostgreSQL.
import pool from "../config/db.js";

// Obtiene todos los servicios
export const obtenerTodosLosServicios = async () => {
    const resultado = await pool.query(
        `
        SELECT
            id_servicio,
            nombre,
            costo,
            duracion_minutos
        FROM servicios
        WHERE estado = 'activo'
        ORDER BY nombre;
        `
    );

    return resultado.rows;
};

// Busca un servicio mediante su identificador.
export const buscarServicioPorId = async (id) => {
    const resultado = await pool.query(
        `
        SELECT
            id_servicio,
            nombre,
            descripcion,
            costo,
            estado,
            duracion_minutos
        FROM servicios
        WHERE id_servicio = $1;
        `,
        [id]
    );

    return resultado.rows[0] || null;
};

// Verifica si un especialista ofrece un servicio en especialista_servicios.
export const verificarEspecialistaHaceServicio = async (id_especialista, id_servicio) => {
    const resultado = await pool.query(
        `
        SELECT 1
        FROM especialista_servicios
        WHERE id_usuario = $1 AND id_servicio = $2
        `,
        [id_especialista, id_servicio]
    );

    return resultado.rows.length > 0;
};

// Busca los especialistas activos que ofrecen un servicio.
export const buscarEspecialistaPorServicio = async (id_servicio) => {
    const resultado = await pool.query(
        `
        SELECT
            u.id_usuario,
            u.nombres,
            u.apellidos,
            u.correo,
            u.numero_telefono
        FROM usuarios u
        JOIN especialista_servicios es
            ON es.id_usuario = u.id_usuario
        WHERE es.id_servicio = $1
            AND u.rol IN ('especialista', 'admin')
            AND u.estado = 'activo'
        ORDER BY u.nombres ASC, u.apellidos ASC;
        `,
        [id_servicio]
    );

    return resultado.rows;
};
