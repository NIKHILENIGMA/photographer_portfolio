import express from "express";
import { AuthenticationController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

// Public routes
// Sign up, login, logout
router.post("/signup", AuthenticationController.signup);
router.post("/login", AuthenticationController.login);

// Protected routes
// Token and profile
router.delete("/logout", isAuthenticated, AuthenticationController.logout);
router.post(
    "/refresh-token",
    isAuthenticated,
    AuthenticationController.refreshToken
);
router.get("/profile", isAuthenticated, AuthenticationController.getProfile);

export default router;
