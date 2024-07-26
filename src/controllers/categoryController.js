import pool from '../db/pool.js';
import { validateRole } from '../utils/validateRole.js';

export const createCategory = async (req, res) => {// #swagger.tags = ['category']
    const { name } = req.body;
    const { user_id } = req.headers;
    try {
        await validateRole(user_id);
        const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategories = async (req, res) => {// #swagger.tags = ['category']
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoryById = async (req, res) => {// #swagger.tags = ['category']
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {// #swagger.tags = ['category']
    const { id } = req.params;
    const { name } = req.body;
    const { user_id } = req.headers;
    try {
        await validateRole(user_id);
        const [result] = await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {// #swagger.tags = ['category']
    const { id } = req.params;
    const { user_id } = req.headers;
    try {
        await validateRole(user_id);
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};