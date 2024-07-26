import { Router } from 'express';
import categoryRoutes from './categoryRoutes.js';
import commentRoutes from './commentRoutes.js';
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';
import { docRouter } from "./docRoutes.js";

const router = Router();

export const apiRouter = (app) => {
    app.use('/api/v1', router);

    router.use('/categories', categoryRoutes);
    router.use('/comments', commentRoutes);
    router.use('/posts', postRoutes);
    router.use('/users', userRoutes);
    router.use('/docs', docRouter);
};