import express from "express";
import { createArticle } from "../../controller/article/createPostController.js";
import requireAuth from "../../middleware/authenticator.js";
import { updateArticle } from "../../controller/article/updateArticleController.js";
import getArticleById from "../../controller/article/getArticleController.js";
import deleteArticle from "../../controller/article/deleteArticlleController.js";

const router = express.Router();

router.post("/", requireAuth, createArticle);
router.patch("/:id", requireAuth, updateArticle);
router.get("/:id", getArticleById);
router.get("/:id", getArticleById);
router.delete("/:id", requireAuth, deleteArticle);

export default router;
