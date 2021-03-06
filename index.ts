import express from 'express';
import userRoutes from './src/routes/users';
import categoryRoutes from './src/routes/categories';
import userTypesRoutes from './src/routes/userTypes';
import authorRoutes from './src/routes/author';
import postRoutes from './src/routes/posts';
import commentRoutes from './src/routes/comments';
import * as bodyParser from 'body-parser';
import './src/services/passport';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();
const BASE_URL = process.env.BASE_URL;

createConnection().then((connection) => {

    const app: Application = express();
    app.use(bodyParser.json());
    
    app.get(`${BASE_URL}/`, (req, res) => {
      res.json('Welcome to the news portal !');
    });
    
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/categories`, categoryRoutes);
    app.use(`${BASE_URL}/user/types`, userTypesRoutes);
    app.use(`${BASE_URL}/author`,authorRoutes);
    app.use(`${BASE_URL}/posts`,postRoutes);
    app.use(`${BASE_URL}/comment`,commentRoutes);
    
    app.listen(process.env.PORT || 3000, () => {
      return console.log(`App is  running at http://localhost:${process.env.PORT || 3000} 🥳🥳`);
    });

})
.catch((err) => {
  console.log(err)
})
