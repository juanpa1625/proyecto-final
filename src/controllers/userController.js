import pool from '../db/pool.js';

export const createUser = async (req, res) => {// #swagger.tags = ['Users']
    const { username, password, email } = req.body;
    const role_id = 2;
    try {
        const [result] = await pool.query('INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)', [username, password, email, role_id]);
        res.status(201).json({ id: result.insertId, username, email, role_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsers = async (req, res) => {// #swagger.tags = ['Users']
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {// #swagger.tags = ['Users']
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {// #swagger.tags = ['Users']
    const { id } = req.params;
    const { username, password, email } = req.body;
    const { user_id } = req.headers;
    try {
        if (id !== user_id) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const [result] = await pool.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [username, password, email, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {// #swagger.tags = ['Users']
    const { id } = req.params;
    const { user_id } = req.headers;
    try {
        if (id !== user_id) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        await pool.query('DELETE FROM comments WHERE user_id = ?', [id]);
        await pool.query('DELETE FROM posts WHERE user_id = ?', [id]);
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};