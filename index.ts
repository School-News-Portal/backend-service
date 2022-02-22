import express from 'express';
import userRoutes from './src/routes/users';
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
    
    app.use("/users", userRoutes);
    
    app.listen(process.env.PORT || 3000, () => {
      return console.log(`App is  running at http://localhost:${process.env.PORT || 3000} 🥳🥳`);
    });

})
.catch((err) => {
  console.log(err)
})
