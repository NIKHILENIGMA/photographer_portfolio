import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = Router();

router.use(isAuthenticated);

// Add contact details
router.route("/add-contact").post(ContactController.createContact);
// Delete contact details
router.route("/:contactId").delete(ContactController.deleteContact);
// Get contact details
router.route("/:contactId").get(ContactController.getContactDetails);
// Get contacts
router.route("/").get(ContactController.getAllContacts);

export default router;
