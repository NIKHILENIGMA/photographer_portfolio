import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";
import { PhotoController } from "../controllers/photo.controller";
import { upload } from "../middleware";

const router = Router();

// Middleware to check if user is authenticated

// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------


// Add image to Photo
router.route("/add-image").post(isAuthenticated, upload.single('photo'), PhotoController.addImageToPhoto);
// Update Photo
router.route("/:photoId").patch(isAuthenticated, PhotoController.updatePhoto);
// Delete Photo
router.route("/:photoId").delete(isAuthenticated, PhotoController.deletePhoto);
// Get Photo Details
router.route("/:photoId").get(PhotoController.getPhotoDetails);
// Get Photos
router.route("/").get(PhotoController.getPhotos);

export default router;
