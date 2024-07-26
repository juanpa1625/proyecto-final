import pool from '../db/pool.js';

export const createComment = async (req, res) => {// #swagger.tags = ['comments']
    const { post_id, user_id, content } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
            [post_id, user_id, content]
        );
        res.status(201).json({ id: result.insertId, post_id, user_id, content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getComments = async (req, res) => {// #swagger.tags = ['comments']
    try {
        const [rows] = await pool.query('SELECT * FROM comments');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateComment = async (req, res) => {// #swagger.tags = ['comments']
    const { id } = req.params;
    const { content } = req.body;
    try {
        await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
        res.json({ message: 'Comment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteComment = async (req, res) => {// #swagger.tags = ['comments']
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM comments WHERE id = ?', [id]);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};