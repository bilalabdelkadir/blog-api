import express from "express";
import { createArticle } from "../../controller/article/createPostController.js";
import requireAuth from "../../middleware/authenticator.js";
import { updateArticle } from "../../controller/article/updateArticleController.js";
import getArticleById from "../../controller/article/getArticleController.js";

const router = express.Router();

router.post("/", requireAuth, createArticle);
router.patch("/:id", requireAuth, updateArticle);
router.get("/:id", getArticleById);

export default router;
