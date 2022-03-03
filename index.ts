import express from 'express';
import userRoutes from './src/routes/users';
import categoryRoutes from './src/routes/categories';
import userTypesRoutes from './src/routes/userTypes';
import * as bodyParser from 'body-parser';
import './src/services/passport';
import { Application } from 'express';
import { createConnection } from 'typeorm';


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
    
    app.listen(process.env.PORT || 3000, () => {
      return console.log(`App is  running at http://localhost:${process.env.PORT || 3000} 🥳🥳`);
    });

})
.catch((err) => {
  console.log(err)
})
