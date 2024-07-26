import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;