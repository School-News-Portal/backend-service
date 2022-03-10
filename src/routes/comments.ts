import * as express from "express";
import { Router } from "express";
import * as commentsController from '../controllers/comments';

const router: Router =express.Router();
router.post('/',commentsController.addComment)

export default router;