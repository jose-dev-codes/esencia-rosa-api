// Importa el pool de conexiones a PostgreSQL.
import pool from "../config/db.js";

// Obtiene todas las citas del usuario con nombre del servicio y del especialista.
export const obtenerTodasLasCitas = async (idUsuario) => {
    const resultado = await pool.query(
        `
        SELECT
            c.*,
            s.nombre AS servicio,
            s.costo AS precio,
            e.nombres AS especialista_nombres,
            e.apellidos AS especialista_apellidos
        FROM citas c
        JOIN servicios s
            ON c.id_servicio = s.id_servicio
        JOIN usuarios e
            ON c.id_especialista = e.id_usuario
        WHERE c.id_usuario = $1
        ORDER BY c.fecha DESC, c.hora DESC;
        `,
        [idUsuario]
    );
    return resultado.rows;
};

// Crea una nueva cita con estado "pendiente" por defecto.
// El costo y la duración se copian del servicio al momento de crearla.
export const crearCita = async (datos) => {
    const { id_servicio, id_usuario, id_especialista, fecha, hora } = datos;

    const resultado = await pool.query(
        `
        INSERT INTO citas (
            id_servicio,
            id_usuario,
            id_especialista,
            fecha,
            hora,
            estado,
            costo_reservado,
            duracion_reservada
        )
        SELECT
            $1, $2, $3, $4, $5, 'pendiente',
            costo, duracion_minutos
        FROM servicios
        WHERE id_servicio = $1
        RETURNING *;
        `,
        [id_servicio, id_usuario, id_especialista, fecha, hora]
    );
    return resultado.rows[0];
};

// Actualiza la fecha, la hora y el especialista de una cita según su identificador.
export const editarCita = async (id, datos) => {
    const { fecha, hora, id_especialista } = datos;

    const resultado = await pool.query(
        `
        UPDATE citas
        SET
            fecha = $1,
            hora = $2,
            id_especialista = $3
        WHERE id_cita = $4
        RETURNING *;
        `,
        [fecha, hora, id_especialista, id]
    );
    return resultado.rows[0] || null;
};

// Cancela una cita cambiando su estado a "cancelada".
export const cancelarCita = async (id) => {
    const resultado = await pool.query(
        `
        UPDATE citas
        SET estado = 'cancelada'
        WHERE id_cita = $1
        RETURNING *;
        `,
        [id]
    );

    return resultado.rows[0] || null;
};

// Elimina una cita según su identificador y devuelve el registro eliminado.
export const eliminarCita = async (id) => {
    const resultado = await pool.query(
        `
        DELETE FROM citas
        WHERE id_cita = $1
        RETURNING *;
        `,
        [id]
    );
    return resultado.rows[0] || null;
};

// Busca si existe una cita que se cruce con la misma fecha y hora para el mismo especialista.
// Si se proporciona un ID, excluye esa misma cita de la búsqueda.
// Solo cuenta las que están en pendiente o confirmada, como la restricción de la DB.
export const buscarCitaExistente = async (
    fecha,
    hora,
    id_especialista,
    duracion_reservada,
    id = null) => {
    const resultado = await pool.query(
        `
        SELECT *
        FROM citas
        WHERE id_especialista = $1
            AND estado IN ('pendiente', 'confirmada')
            AND tsrange(
                fecha + hora,
                fecha + hora + duracion_reservada * INTERVAL '1 minute',
                '[)'
            ) && tsrange(
                $2::date + $3::time,
                $2::date + $3::time + $4::integer * INTERVAL '1 minute',
                '[)'
            )
            AND ($5::integer IS NULL OR id_cita != $5)
        `,
        [id_especialista, fecha, hora, duracion_reservada, id]
    );

    return resultado.rows[0] || null;
};

// Obtiene una cita según su identificador.
export const buscarCitaPorId = async (id) => {
    const resultado = await pool.query(
        `
        SELECT *
        FROM citas
        WHERE id_cita = $1;
        `,
        [id]
    );

    return resultado.rows[0] || null;
};

// Obtiene la próxima cita pendiente o confirmada del usuario.
export const obtenerProximaCita = async (idUsuario) => {
    const resultado = await pool.query(
        `
        SELECT
            c.*,
            s.nombre AS servicio,
            s.costo AS precio
        FROM citas c
        JOIN servicios s
            ON c.id_servicio = s.id_servicio
        WHERE c.id_usuario = $1
            AND c.estado IN ('pendiente', 'confirmada')
            AND (
                c.fecha > CURRENT_DATE
                OR (
                    c.fecha = CURRENT_DATE
                    AND c.hora >= CURRENT_TIME
                )
            )
        ORDER BY c.fecha ASC, c.hora ASC
        LIMIT 1;
        `,
        [idUsuario]
    );

    return resultado.rows[0] || null;
};

export const buscarHorariosPorEspecialista = async (idEspecialista) => {
    const resultado = await pool.query(
        `
        SELECT
            dia_semana,
            hora_inicio,
            hora_fin
        FROM horarios_especialistas
        WHERE id_usuario = $1
        ORDER BY dia_semana ASC
        `,
        [idEspecialista]
    );

    return resultado.rows;
};

// Obtiene las citas ocupadas de un especialista en una fecha.
// Solo cuenta pendiente o confirmada, como la restricción de la DB.
// Devuelve hora y duracion_reservada para calcular los huecos libres.

export const buscarCitasOcupadasPorEspecialistaYFecha = async (
    idEspecialista,
    fecha
) => {
    const resultado = await pool.query(
        `
        SELECT
            id_cita,
            hora,
            duracion_reservada
        FROM citas
        WHERE id_especialista = $1
            AND fecha = $2
            AND estado IN ('pendiente', 'confirmada')
        ORDER BY hora ASC
        `,
        [idEspecialista, fecha]
    );

    return resultado.rows;
};
