import express, { Express } from 'express';
import { authRoutes, noteRoutes, userRoutes } from './routes';
import { errorHandler } from './middleware/error-handler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger.json';
import passport from './config/passport/passport';

export const app: Express = express();

app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', (_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);
