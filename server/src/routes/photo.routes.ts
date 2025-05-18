import express from "express";
import { upload } from "../middleware";
import { PhotoController } from "../controllers/photo.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

// Public routes
// Fetch all photos
router.get("/", PhotoController.getPhotos);


// Protected routes
// Upload new image
router
  .route("/add-image")
  .post(
    isAuthenticated,
    upload.single("photo"),
    PhotoController.addImageToPhoto
  );


// Photo CRUD by ID
router
  .route("/:photoId")
  .get(PhotoController.getPhotoDetails)
  .patch(isAuthenticated, upload.single("photo"), PhotoController.updatePhoto)
  .delete(isAuthenticated, PhotoController.deletePhoto);

export default router;
