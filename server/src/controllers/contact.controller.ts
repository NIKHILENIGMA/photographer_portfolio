import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { contactSchema } from "../validators/contact.validator";
import {
  ApiResponse,
  DatabaseError,
  InternalServerError,
  StandardError,
} from "../util";

export class ContactController {
  static async createContact(req: Request, res: Response) {
    try {
      const validated = contactSchema.parse(req.body);

      const message = await ContactService.createContact(validated);

      ApiResponse(req, res, 201, "Contact message sent successfully", {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while creating contact"
      );
    }
  }

  static async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await ContactService.getAllContacts();
      if (!contacts) {
        throw new DatabaseError("No contacts found");
      }
      ApiResponse(req, res, 200, "Contacts fetched successfully", {
        contacts,
      });
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while fetching contacts"
      );
    }
  }

  static async getContactDetails(req: Request, res: Response) {
    try {
      const { contactId } = req.params;

      const contact = await ContactService.getContactDetails(contactId);

      ApiResponse(req, res, 200, "Contact details fetched successfully", {
        contact,
      });
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while fetching contact details"
      );
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { contactId } = req.params;

      const message = await ContactService.deleteContact(contactId);

      ApiResponse(req, res, 200, "Contact deleted successfully", {});
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while deleting contact"
      );
    }
  }
}
