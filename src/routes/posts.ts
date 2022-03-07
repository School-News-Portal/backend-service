import * as express from "express";
import { Router } from "express";
import * as PostsController from '../controllers/posts';

const router: Router = express.Router();

router.post("/", PostsController.create);
router.get("/", PostsController.all);
router.get("/:id", PostsController.single);
router.put("/:id", PostsController.update);
router.delete("/:id", PostsController.deletePost);

export default router;