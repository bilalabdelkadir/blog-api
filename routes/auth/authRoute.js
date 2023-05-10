import express from "express";
import registerUser from "../../controller/auth/registerController.js";
import loginUser from "../../controller/auth/signinController.js";
import forgotPassword from "../../controller/auth/forgertPassword.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forget", forgotPassword);
export default router;
