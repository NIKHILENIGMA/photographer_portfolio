import { prisma } from "../config";
import { contactData } from "../types/base.types";
import {
  DatabaseError,
  InternalServerError,
  NotFoundError,
  StandardError,
} from "../util";

export class ContactService {
  static async createContact(data: contactData) {
    try {
      const contact = await prisma.contact.create({
        data: {
          ...data,
          companyName: data.companyName ?? "",
        },
      });
      if (!contact) {
        throw new DatabaseError("Failed to create contact");
      }

      return `Contact message from ${contact.firstName} saved successfully.`;
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occured while creating a contact!"
      );
    }
  }

  static async getAllContacts() {
    try {
      return await prisma.contact.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occured while fetching contacts!"
      );
    }
  }

  static async deleteContact(contactId: string) {
    try {
      const contact = await prisma.contact.findUnique({
        where: { id: contactId },
      });

      if (!contact) {
        throw new NotFoundError(
          "Contact not found or might be deleted from the database"
        );
      }

      await prisma.contact.delete({ where: { id: contactId } });

      return `Contact from ${contact.email} deleted successfully.`;
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }
      throw new InternalServerError(
        "An unexpected error occured while deleting a contact!"
      );
    }
  }

  static async getContactDetails(contactId: string) {
    try {
      const contact = await prisma.contact.findUnique({
        where: { id: contactId },
      });

      if (!contact) {
        throw new NotFoundError(
          "Contact not found or might be deleted from the database"
        );
      }

      return contact;
    } catch (error) {
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occured while fetching contact details!"
      );
    }
  }
}
