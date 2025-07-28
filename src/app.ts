import express, { Express } from 'express';
import { authRoutes, noteRoutes, userRoutes } from './routes';
import { errorHandler } from './middleware/error-handler.middleware';
import swaggerDocs from './utils/swagger';

export const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

swaggerDocs(app);

app.use('/', (_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);
