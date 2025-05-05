import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { contactSchema } from "../validators/contact.validator";
import { ApiResponse, ApiError } from "../util";

export class ContactController {
  static async createContact(req: Request, res: Response) {
    try {
      const validated = contactSchema.parse(req.body);

      const message = await ContactService.createContact(validated);

      res.status(201).json(ApiResponse.successResponse(message, {}, 201));
    } catch (error) {
      ContactController.handleError(error, "Error saving contact message");
    }
  }

  static async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await ContactService.getAllContacts();
      res
        .status(200)
        .json(ApiResponse.successResponse("Contacts fetched", contacts, 200));
    } catch (error) {
      ContactController.handleError(error, "Error fetching contacts");
    }
  }

  static async getContactDetails(req: Request, res: Response) {
    try {
      const { contactId } = req.params;

      const contact = await ContactService.getContactDetails(contactId);

      res
        .status(200)
        .json(ApiResponse.successResponse("Contact fetched", contact, 200));
    } catch (error) {
      ContactController.handleError(error, "Error fetching contact details");
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { contactId } = req.params;

      const message = await ContactService.deleteContact(contactId);

      res.status(200).json(ApiResponse.successResponse(message, 200));
    } catch (error) {
      ContactController.handleError(error, "Error deleting contact");
    }
  }

  private static handleError(error: unknown, fallback: string) {
    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        throw new ApiError(error.message, 404);
      }
      throw new ApiError(error.message, 500);
    }

    throw new ApiError(fallback, 500, error);
  }
}
