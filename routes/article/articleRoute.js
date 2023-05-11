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
 * tags:
 *  name: Articles
 *  description: The articles managing API
 */

/**
 * @swagger
 * /article:
 *  get:
 *   summary: Returns the list of all the articles
 *  tags: [Articles]
 * responses:
 *  200:
 *  description: The list of the articles
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * 500:
 * description: Some server error
 * 404:
 * description: The articles were not found
 */

/**
 * @swagger
 * /api/v1/article/{id}:
 * get:
 * summary: Get the article by id
 * tags: [Articles]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The article id
 * responses:
 * 200:
 * description: The article description by id
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Article'
 * 404:
 * description: The article was not found
 * 500:
 * description: Some error happened
 * */

/**
 * @swagger
 * /:
 * post:
 * summary: Create a new article
 * tags: [Articles]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Article'
 * responses:
 * 200:
 * description: The article was successfully created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Article'
 * 500:
 * description: Some error happened
 * */

/**
 * @swagger
 * /articles/{id}:
 * patch:
 * summary: Update the article by the id
 * tags: [Articles]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The article id
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Article'
 * responses:
 * 200:
 * description: The article was updated
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Article'
 * 404:
 * description: The article was not found
 * 500:
 * description: Some error happened
 * */

/**
 * @swagger
 * /articles/{id}:
 * delete:
 * summary: Remove the article by id
 * tags: [Articles]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The article id
 * responses:
 * 200:
 * description: The article was deleted
 * 404:
 * description: The article was not found
 * 500:
 * description: Some error happened
 * */

const router = express.Router();

router.get("/article/", getArticles);
router.get("/article/:id", getArticleById);
router.post("/article/", requireAuth, createArticle);
router.patch("/article/:id", requireAuth, updateArticle);
router.delete("/article/:id", requireAuth, deleteArticle);

export default router;
