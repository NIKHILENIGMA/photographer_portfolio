import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { upload } from "../middleware";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = Router();

// Middleware to check if user is authenticated
// ------------------------------------------------------------------------------
router.use(isAuthenticated);
// ------------------------------------------------------------------------------

// Get profile
router.route("/").get(AdminController.getProfile);

// Update profile
router.route("/").patch(AdminController.updateProfile);

// Change password
router.route("/change-password").patch(AdminController.changePassword);

// Add Avatar
router
  .route("/add-avatar")
  .post(upload.single("avatar"), AdminController.addAvatar);

// Remove Avatar
router.route("/remove-avatar").delete(AdminController.removeAvatar);

export default router;
