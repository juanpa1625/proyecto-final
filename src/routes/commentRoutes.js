import { Router } from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js';

const router = Router();

router.post('/', createComment);
router.get('/', getComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;