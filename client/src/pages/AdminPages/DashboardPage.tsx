import { ChangeEvent, JSX, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/hooks/useAuthContext";
import Container from "@/container";
import { FaPencil } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addAvatar, removeAvatar } from "@/services/api/adminServices";
import AuthService from "@/services/api/authServices";

export default function Dashboard(): JSX.Element {
  const { user, setUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!user) {
    return <div>Loading...</div>; // Handle null user case
  }

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const uploadFile: File | undefined = e.target.files?.[0];
    if (!uploadFile) {
      return;
    }

    setSelectedFile(uploadFile);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }
      await addAvatar(selectedFile);
      setSelectedFile(null); // Clear the file after upload
      setIsOpen(false); // Close the dialog
      if (inputRef.current) {
        inputRef.current.value = ""; // Clear the file input
      }

      const updatedUser = await AuthService.getProfile(
        AuthService.getToken() as string
      ); // Fetch the updated user profile
      setUser({
        ...user,
        avatarImage: updatedUser.data.avatarImage, // Update the user state with the new avatar
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await removeAvatar();
      setSelectedFile(null); // Clear the file after upload
      setIsOpen(false); // Close the dialog

      if (inputRef.current) {
        inputRef.current.value = ""; // Clear the file input
      }

      setUser({
        ...user,
        avatarImage: "", // Update the user state with the new avatar
      });
    } catch (error) {
      console.error("Error removing avatar:", error);
    }
  };

  return (
    <Container>
      <div className="p-6 space-y-8 font-MonaSans">
        {/* Cover Image */}
        <div className="relative h-96 w-full rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Cover"
            className="object-cover w-full h-full z-10 rounded-xl"
          />
          {/* Avatar */}
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 z-50">
            <div className="absolute bottom-2 right-2.5 rounded-full z-20 w-6 h-6">
              <Button
                variant="ghost"
                className="rounded-full hover:none"
                onClick={handleDialogOpen}
              >
                <FaPencil className="" size={6} />
              </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Avatar</DialogTitle>
                  <DialogDescription>Add your avatar image.</DialogDescription>
                  <div className="flex flex-col bg-amber-300 space-y-4 items-center w-full justify-center p-10">
                    {user && user.avatarImage ? (
                      <div className="flex flex-col items-center p-3 space-y-5">
                        <img
                          src={user.avatarImage}
                          alt={user.firstName}
                          className="w-64 h-64 rounded-full object-cover"
                        />

                        <Button
                          variant={"destructive"}
                          onClick={handleRemoveAvatar}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center w-64 h-64 space-y-3">
                        <div className="rounded-full bg-amber-500 w-full h-64 flex items-center justify-center">
                          <input
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleFileChange(e)
                            }
                            className="hidden"
                          />
                          <div
                            className="w-64 h-64 rounded-full flex justify-center items-center cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                          >
                            {selectedFile ? (
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <p className="text-black">No file selected</p>
                            )}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant={"secondary"}
                          className="cursor-pointer"
                          onClick={handleFileUpload}
                        >
                          Upload
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
              <AvatarImage
                src={
                  user?.avatarImage !== ""
                    ? user?.avatarImage
                    : "https://images.unsplash.com/photo-1552663651-2e4250e6c7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                }
                alt="Avatar"
                className="rounded-full object-cover"
              />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Admin Details */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div className="block md:flex justify-center space-x-4">
          {/* Change Details */}
          <Card className="mt-6 w-full md:w-1/2">
            <CardHeader>
              <CardTitle>Change Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2.5">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col space-y-2.5">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" type="text" placeholder="Last Name" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2.5">
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input
                    id="email-address"
                    type="email"
                    placeholder="Email Address"
                  />
                </div>
                <Button type="submit" variant={"default"} className="w-full">
                  Update Details
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="mt-6 w-full md:w-1/2">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Current Password"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
