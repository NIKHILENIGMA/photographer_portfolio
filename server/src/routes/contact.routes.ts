import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = Router();

// Add contact details
router.route("/add-contact").post(ContactController.createContact);
// Delete contact details
router
  .route("/:contactId")
  .delete(isAuthenticated, ContactController.deleteContact);
// Get contact details
router
  .route("/:contactId")
  .get(isAuthenticated, ContactController.getContactDetails);
// Get contacts
router.route("/").get(isAuthenticated, ContactController.getAllContacts);

export default router;
