import * as express from "express";
import { Router } from "express";
import * as UserTypeController from '../controllers/userTypes';

const router: Router = express.Router();

router.post("/", UserTypeController.create);
router.get("/", UserTypeController.all);
router.get("/", UserTypeController.single);
router.get("/", UserTypeController.single);
router.put("/", UserTypeController.update);
router.delete("/", UserTypeController.deleteType);

export default router;