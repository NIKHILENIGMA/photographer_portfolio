import express from "express";
import { ContactController } from "../controllers/contact.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

router.use(isAuthenticated);

// Create and get contacts
router.post("/add", ContactController.createContact);
router.get("/", ContactController.getAllContacts);

// Individual contact actions
router.route("/:contactId")
  .get(ContactController.getContactDetails)
  .delete(ContactController.deleteContact);

export default router;
