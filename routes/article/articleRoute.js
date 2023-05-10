import express from "express";
import { createArticle } from "../../controller/article/createPostController.js";
import requireAuth from "../../middleware/authenticator.js";

const router = express.Router();

router.post("/", requireAuth, createArticle);

export default router;
