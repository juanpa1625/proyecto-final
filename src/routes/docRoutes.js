import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: "json" };

export const docRouter = Router()



docRouter.use('/', swaggerUi.serve);
docRouter.get('/', swaggerUi.setup(swaggerDocument));