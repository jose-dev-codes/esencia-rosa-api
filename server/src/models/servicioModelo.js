// Importa el pool de conexiones a PostgreSQL.
import pool from "../config/db.js";

// Crea un nuevo servicio.
export const crearServicio = async (datos) => {
    const { nombre, descripcion, costo, duracion_minutos } = datos;
    const resultado = await pool.query(
        `
        INSERT INTO servicios (
            nombre,
            descripcion,
            costo,
            duracion_minutos
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [nombre, descripcion, costo, duracion_minutos]
    );

    return resultado.rows[0];
};

// Obtiene todos los servicios
export const obtenerTodosLosServicios = async () => {
    const resultado = await pool.query(
        `
        SELECT
            id_servicio,
            nombre,
            descripcion,
            costo,
            duracion_minutos,
            estado
        FROM servicios
        ORDER BY nombre;
        `
    );

    return resultado.rows;
};

export const obtenerServiciosActivos = async () => {
    const resultado = await pool.query(
        `
        SELECT
            id_servicio,
            nombre,
            descripcion,
            costo,
            duracion_minutos,
            estado
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

export const buscarServicioPorNombre = async (
    nombreServicio, idServicio = null
) => {
    const resultado = await pool.query(
        `
        SELECT 1
        FROM servicios
        WHERE LOWER(nombre) = LOWER($1)
            AND ($2::integer IS NULL OR id_servicio != $2);
        `,
        [nombreServicio, idServicio]
    );

    return resultado.rows.length > 0;
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

// Actualiza un servicio según su identificador.
export const actualizarServicio = async (idServicio, datos) => {
    const { nombre, descripcion, costo, duracion_minutos} = datos;
    const resultado = await pool.query(
        `
        UPDATE servicios
        SET
            nombre = $1,
            descripcion = $2,
            costo = $3,
            duracion_minutos = $4
        WHERE id_servicio = $5
        RETURNING *;
        `,
        [nombre, descripcion, costo, duracion_minutos, idServicio]
    );

    return resultado.rows[0] || null;
};

// Cuenta cuántas citas activas tiene un servicio.
export const contarCitasActivasPorServicio = async (idServicio) => {
    const resultado = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM citas
        WHERE id_servicio = $1
            AND estado IN ('pendiente', 'confirmada');
        `,
        [idServicio]
    );

    return Number(resultado.rows[0].total);
};

// Cuenta cuántas citas tiene un servicio, de cualquier estado.
export const contarCitasPorServicio = async (idServicio) => {
    const resultado = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM citas
        WHERE id_servicio = $1;
        `,
        [idServicio]
    );

    return Number(resultado.rows[0].total);
};

export const eliminarServicio = async (idServicio) => {
    const resultado = await pool.query(
        `
        DELETE FROM servicios
        WHERE id_servicio = $1
        RETURNING *;
        `,
        [idServicio]
    );

    return resultado.rows[0] || null;
};

// Inhabilita un servicio, lo deja en 'inactivo' para activarlo después.
export const inhabilitarServicio = async (idServicio) => {
    const resultado = await pool.query(
        `
        UPDATE servicios
        SET estado = 'inactivo'
        WHERE id_servicio = $1
        RETURNING *;
        `,
        [idServicio]
    );

    return resultado.rows[0] || null;
};

// Habilita un servicio, lo vuelve a dejar en 'activo'.
export const habilitarServicio = async (idServicio) => {
    const resultado = await pool.query(
        `
        UPDATE servicios
        SET estado = 'activo'
        WHERE id_servicio = $1
        RETURNING *;
        `,
        [idServicio]
    );

    return resultado.rows[0] || null;
};
