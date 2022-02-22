import * as express from "express";
import { Router } from "express";
import { register, login} from '../controllers/users';

const BASE_URL = process.env.BASE_URL;


const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;