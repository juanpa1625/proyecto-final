import express from 'express';
import { apiRouter } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
apiRouter(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});