import { Router } from 'express';
import { createPost, getAllPosts, getPostsByCategory, searchPostsByTitle, getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/filter', getPostsByCategory);
router.get('/search', searchPostsByTitle);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;