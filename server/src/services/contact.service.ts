import { PrismaClient } from "@prisma/client";
import { contactData } from "../types/base.types";

const prisma = new PrismaClient();

export class ContactService {
  static async createContact(data: contactData) {
    const contact = await prisma.contact.create({
      data: {
        ...data,
        companyName: data.companyName ?? "",
      },
    });
    return `Contact message from ${contact.firstName} saved successfully.`;
  }

  static async getAllContacts() {
    return prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async deleteContact(contactId: string) {
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }

    await prisma.contact.delete({ where: { id: contactId } });

    return `Contact from ${contact.email} deleted successfully.`;
  }

  static async getContactDetails(contactId: string) {
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }

    return contact;
  }
}
