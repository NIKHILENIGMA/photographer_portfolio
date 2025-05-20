import { Request, Response } from 'express'
import { ContactService } from '../services/contact.service'
import { contactSchema } from '../validators/contact.validator'
import { ApiResponse, DatabaseError } from '../util'

export class ContactController {
    static async createContact(req: Request, res: Response) {
        // Validate the request body
        const validated = contactSchema.parse(req.body)

        // Check if the request body is valid
        const message: string = await ContactService.createContact(validated)

        // If the request body is not valid, throw an error
        ApiResponse(req, res, 201, message, {})
    }

    static async getAllContacts(req: Request, res: Response) {
        const contacts = await ContactService.getAllContacts()

        if (contacts.length === 0) {
            ApiResponse(req, res, 200, 'No contacts found', {})
            return
        }

        if (!contacts) {
            throw new DatabaseError('No contacts found in the database')
        }
        ApiResponse(req, res, 200, 'Contacts fetched successfully', {
            contacts
        })
    }

    static async getContactDetails(req: Request, res: Response) {
        const { contactId } = req.params

        const contact = await ContactService.getContactDetails(contactId)
        if (!contact) {
            throw new DatabaseError('Failed to get contact')
        }

        ApiResponse(req, res, 200, 'Contact details fetched successfully', {
            contact
        })
    }

    static async deleteContact(req: Request, res: Response) {
        const { contactId } = req.params

        const message = await ContactService.deleteContact(contactId)

        ApiResponse(req, res, 200, message, {})
    }
}
