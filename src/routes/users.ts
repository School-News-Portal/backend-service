import * as express from "express";
import { Router } from "express";
import { register, login} from '../controllers/users';

const BASE_URL = process.env.BASE_URL;


const router: Router = express.Router();

router.post(`${BASE_URL}/users`, register);
router.post(`${BASE_URL}/user/login`, login);

export default router;