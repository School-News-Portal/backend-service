import express from 'express';
import userRoutes from './src/routes/users';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
