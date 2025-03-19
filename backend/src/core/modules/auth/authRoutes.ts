import express from "express";
var router = express.Router();
import authController from "./authController";


router.post("/signIn", authController.handleSignIn);
router.post("/refreshToken",authController.handleRefreshToken);
router.post('/logout', authController.handleLogOut);

export default router;
