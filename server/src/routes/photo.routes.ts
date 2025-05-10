import express from "express";
import { PhotoController } from "../controllers/photo.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";
import { upload } from "../middleware/multer.middleware";

const router = express.Router();

// Upload new image
router.post(
  "/add-image",
  isAuthenticated,
  upload.single("photo"),
  PhotoController.addImageToPhoto
);

// Fetch all photos
router.get("/", PhotoController.getPhotos);

// Photo CRUD by ID
router
  .route("/:photoId")
  .get(PhotoController.getPhotoDetails)
  .patch(isAuthenticated, PhotoController.updatePhoto)
  .delete(isAuthenticated, PhotoController.deletePhoto);

export default router;
