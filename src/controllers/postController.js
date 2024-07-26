import pool from '../db/pool.js';

export const createPost = async (req, res) => {// #swagger.tags = ['posts']
    const { title, content, category_id } = req.body;
    const { user_id } = req.headers;
    try {
        const [result] = await pool.query('INSERT INTO posts (user_id, title, content, category_id) VALUES (?, ?, ?, ?)', [user_id, title, content, category_id]);
        res.status(201).json({ id: result.insertId, user_id, title, content, category_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllPosts = async (req, res) => {// #swagger.tags = ['posts']
    try {
        const [rows] = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPostsByCategory = async (req, res) => {// #swagger.tags = ['posts']
    const { category } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM posts WHERE category_id = ?', [category]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const searchPostsByTitle = async (req, res) => {// #swagger.tags = ['posts']
    const { title } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM posts WHERE title LIKE ?', [`%${title}%`]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPostById = async (req, res) => {// #swagger.tags = ['posts']
    const { id } = req.params;
    try {
        const postQuery = 'SELECT * FROM posts WHERE id = ?';
        const [post] = await pool.query(postQuery, [id]);

        if (post.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const commentsQuery = 'SELECT * FROM comments WHERE post_id = ?';
        const [comments] = await pool.query(commentsQuery, [id]);

        res.json({ ...post[0], comments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updatePost = async (req, res) => {// #swagger.tags = ['posts']
    const { id } = req.params;
    const { title, content, category_id } = req.body;
    const { user_id } = req.headers;
    try {
        const [result] = await pool.query(
            'UPDATE posts SET title = ?, content = ?, category_id = ? WHERE id = ? AND user_id = ?',
            [title, content, category_id, id, user_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found or not authorized' });
        }
        res.json({ message: 'Post updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {// #swagger.tags = ['posts']
    const { id } = req.params;
    const { user_id } = req.headers;
    try {
        const [rows] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (rows[0].user_id !== user_id) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        await pool.query('DELETE FROM comments WHERE post_id = ?', [id]);
        await pool.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};