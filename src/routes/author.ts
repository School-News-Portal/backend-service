import * as express from "express";
import { Router } from "express";
import * as AuthorController from '../controllers/author';

const router: Router = express.Router();

router.post("/", AuthorController.create);
router.get("/", AuthorController.all);
router.get("/:id", AuthorController.single);
router.put("/:id", AuthorController.update);
router.delete("/:id", AuthorController.deleteAuthor);

export default router;