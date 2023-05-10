import express from "express";
import registerUser from "../../controller/auth/registerController.js";

const router = express.Router();

router.post("/signup", registerUser);

export default router;
