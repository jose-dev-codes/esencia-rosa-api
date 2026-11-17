// Importa el pool de conexiones a PostgreSQL.
import pool from "../config/db.js";

// Busca el horario de un especialista para un día de la semana.
// dia_semana estándar ISO: 1 = Lunes, 7 = Domingo.
export const buscarHorarioPorEspecialistaYDia = async (
    id_especialista, dia_semana
) => {
    const resultado = await pool.query(
        `
        SELECT
            id_horario,
            id_usuario,
            dia_semana,
            hora_inicio,
            hora_fin
        FROM horarios_especialistas
        WHERE id_usuario = $1 AND dia_semana = $2
        `,
        [id_especialista, dia_semana]
    );

    return resultado.rows[0] || null;
};
