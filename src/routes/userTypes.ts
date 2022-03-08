import * as express from "express";
import { Router } from "express";
import * as UserTypeController from '../controllers/userTypes';

const router: Router = express.Router();

router.post("/", UserTypeController.create);
router.get("/", UserTypeController.all);
router.get("/:id", UserTypeController.single);
router.put("/:id", UserTypeController.update);
router.delete("/:id", UserTypeController.deleteType);

export default router;