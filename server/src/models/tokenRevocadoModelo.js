// Importa el pool de conexiones para realizar consultas a PostgreSQL.
import pool from "../config/db.js";

// Registra un token revocado.
export const registrarTokenRevocado = async (tokenId, fechaExpiracion) => {
    await pool.query(
        `
        INSERT INTO tokens_revocados (token_id, fecha_expiracion)
        VALUES ($1, $2)
        ON CONFLICT (token_id) DO NOTHING;
        `,
        [tokenId, fechaExpiracion]
    );
};

// Comprueba si un token está revocado.
export const tokenEstaRevocado = async (tokenId) => {
    const resultado = await pool.query(
        `
        SELECT 1
        FROM tokens_revocados
        WHERE token_id = $1
        `,
        [tokenId]
    );

    return resultado.rowCount > 0;
};
