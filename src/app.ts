import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
