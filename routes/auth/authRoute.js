import express from "express";
import registerUser from "../../controller/auth/registerController.js";
import loginUser from "../../controller/auth/signinController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
