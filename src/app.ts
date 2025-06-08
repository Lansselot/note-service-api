import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.router';
import noteRoutes from './routes/note.router';

const app: Express = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use('/', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
