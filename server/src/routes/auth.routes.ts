import { Router } from "express";
import { AuthenticationController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = Router();

// Signup
router.route("/signup").post(AuthenticationController.signup);
// Login
router.route("/login").post(AuthenticationController.login);

// logout
router.route("/logout").post(AuthenticationController.logout);
// Reset Password
// todo: add reset password route

// Refresh Token
router
  .route("/refresh-token")
  .post(isAuthenticated, AuthenticationController.refreshToken);

// Get User Profile
router
  .route("/profile")
  .get(isAuthenticated, AuthenticationController.getProfile);

export default router;
