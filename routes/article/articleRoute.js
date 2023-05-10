import express from "express";
import { createArticle } from "../../controller/article/createPostController.js";
import requireAuth from "../../middleware/authenticator.js";
import { updateArticle } from "../../controller/article/updateArticleController.js";
import getArticleById from "../../controller/article/getArticleController.js";
import deleteArticle from "../../controller/article/deleteArticlleController.js";
import getArticles from "../../controller/article/getArticlesController.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - author
 *         - categories
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *           description: The title of the article
 *         body:
 *           type: string
 *           description: The body of the article
 *         author:
 *           type: string
 *           description: The id of the user who created the article
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *             description: The ids of users who liked the article
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             description: The categories the article belongs to
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             description: The ids of comments on the article
 */

/**
 * @swagger
 * /:
 * get:
 *    summery: Return all the list of the books
 *
 */

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", requireAuth, createArticle);
router.patch("/:id", requireAuth, updateArticle);
router.delete("/:id", requireAuth, deleteArticle);

export default router;
