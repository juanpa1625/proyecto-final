import pool from '../db/pool.js';

export const validateRole = async (user_id) => {
    const userSql = 'SELECT id_rol FROM usuarios WHERE id_usuario = ?';
    const [rs] = await pool.query(userSql, [user_id]);
    if (rs[0].id_rol !== 1) {
        throw { message: 'Usuario no autorizado', status: 401 };
    }
};