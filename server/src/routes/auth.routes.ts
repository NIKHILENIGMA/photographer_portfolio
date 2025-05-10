import express from "express";
import { AuthenticationController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

// Sign up, login, logout
router.post("/signup", AuthenticationController.signup);
router.post("/login", AuthenticationController.login);
router.delete("/logout", AuthenticationController.logout);

// Token and profile
router.post("/refresh-token", isAuthenticated, AuthenticationController.refreshToken);
router.get("/profile", isAuthenticated, AuthenticationController.getProfile);

export default router;
