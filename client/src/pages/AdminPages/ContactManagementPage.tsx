import { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useContactQuery, useDeleteContactMutation } from "@/hooks/useContacts";
import Loader from "@/components/Common/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  createdAt: object;
  updateAt: object;
}

export default function ContactManagementPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isPending } = useContactQuery();
  const { mutateAsync: deleteContact } = useDeleteContactMutation();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Delete contact mutation
  const handleDeleteContact = async (id: string) => {
    try {
      // Call the delete contact mutation
      await deleteContact(id);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Filter contacts based on search term
  useEffect(() => {
    if (data?.data?.contacts) {
      const filtered = data.data.contacts.filter((contact: Contact) =>
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]); // Fallback to empty array
    }
  }, [data?.data?.contacts, searchTerm]);

  return (
    <div className="p-4 space-y-6 font-Roboto">
      <h1 className="text-2xl font-semibold text-center">Contact Management</h1>

      <div className="flex justify-center space-x-4">
        <Input
          type="text"
          placeholder="Search contacts..."
          className="w-full max-w-md"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <Loader />}

        {!isPending && (!filteredContacts || filteredContacts.length === 0) && (
          <p className="text-center text-gray-500 col-span-full">
            No contacts available.
          </p>
        )}

        {!isPending &&
          filteredContacts.length > 0 &&
          filteredContacts.map((contact: Contact, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  {contact.firstName} {contact.lastName}
                </CardTitle>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setDialogOpen(true)}
                >
                  <Trash2 size={16} />
                </button>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p className="text-sm">
                  <strong>Message:</strong> {contact.message}
                </p>
                <p className="text-sm">
                  <strong>Company: </strong> {contact.companyName}
                </p>
                <p className="text-sm">
                  <strong>Time:</strong> {new Date().toLocaleTimeString()}
                </p>
              </CardContent>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this contact? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <Loader />
        ) : filteredContacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : null}
      </div>
    </div>
  );
}
