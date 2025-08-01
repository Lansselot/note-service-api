import { app } from './app';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

async function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
