import express from "express";
import registerUser from "../../controller/auth/registerController.js";
import loginUser from "../../controller/auth/signinController.js";
import forgotPassword from "../../controller/auth/forgertPassword.js";
import resetPassword from "../../controller/auth/resetpasswordcontroller.js";
import verifyEmail from "../../controller/auth/verifyEmailController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forget", forgotPassword);
router.post("/reset", resetPassword);
router.get("/verify-email", verifyEmail);
export default router;
