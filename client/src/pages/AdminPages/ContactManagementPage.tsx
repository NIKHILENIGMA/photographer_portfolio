import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function ContactManagementPage() {
  const [filter, setFilter] = useState("name");
  const [dialogOpen, setDialogOpen] = useState(false);

  const contacts = [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+123456789",
      message: "Looking forward to working with you!",
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+987654321",
      message: "Please send me the details.",
    },
  ];
  console.log("Filter applied:", filter);

  return (
    <div className="p-4 space-y-6 font-MonaSans">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-center">Contact Management</h1>

      {/* Dropdown Filter */}
      <div className="flex justify-center space-x-4">
        {/* Alphabetical Filter */}
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by Name/Email" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        {/* Time-based Filter */}
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recently">Recently Added</SelectItem>
            <SelectItem value="old">Old</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                {contact.fullName}
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
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm">
                <strong>Time:</strong> {new Date().toLocaleTimeString()}
              </p>
            </CardContent>

            {/* Delete Confirmation Dialog */}
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
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => {
                      // Handle delete logic here
                      console.log("Deleted contact:", contact.fullName);
                      setDialogOpen(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>
    </div>
  );
}
