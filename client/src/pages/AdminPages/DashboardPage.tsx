import React, { ChangeEvent, JSX } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/container";
import { FaPencil } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageLoader from "@/components/Common/ImageLoader";
import { useDashboard } from "@/hooks/useDashboard";
import { useUpdateDetailsMutation } from "./../../hooks/useUserDetails";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Dashboard(): JSX.Element {
  const {
    user,
    inputRef,
    dashboardState,
    handleDialogOpen,
    handleFileChange,
    handleFileUpload,
    handleRemoveAvatar,
  } = useDashboard();

  const { mutateAsync: updateDetailsMutation } = useUpdateDetailsMutation();

  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleUserDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUserDetailsFormSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (userDetails.firstName === "" || userDetails.lastName === "") {
        console.error("First name and last name can not be empty");
        return;
        
      }
      // Handle form submission logic here
      await updateDetailsMutation(userDetails);
    } catch (error) {
      console.error("Error updating user details:", error);
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
            loading="lazy"
          />
          {/* Avatar */}
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 z-50">
            <div className="absolute bottom-2 right-2.5 rounded-full z-20 w-6 h-6">
              <Button
                variant="ghost"
                className="rounded-full hover:bg-gray-100"
                onClick={handleDialogOpen}
                aria-label="Edit avatar"
              >
                <FaPencil size={12} />
              </Button>
            </div>
            <Dialog
              open={dashboardState.isOpen}
              onOpenChange={handleDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Avatar</DialogTitle>
                  <DialogDescription>Add your avatar image.</DialogDescription>
                  <div className="flex flex-col space-y-4 items-center w-full justify-center p-10">
                    {user && user.profilePicture ? (
                      <div className="flex flex-col items-center p-3 space-y-5">
                        {dashboardState.loading ? (
                          <ImageLoader />
                        ) : (
                          <div>
                            <img
                              src={user.profilePicture}
                              alt={user.firstName}
                              className="w-64 h-64 rounded-full object-cover"
                            />
                          </div>
                        )}

                        <Button
                          variant={"destructive"}
                          className="cursor-pointer"
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
                            {dashboardState.loading ? (
                              <ImageLoader />
                            ) : dashboardState.selectedFile &&
                              !dashboardState.loading ? (
                              <img
                                src={URL.createObjectURL(
                                  dashboardState.selectedFile
                                )}
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
                          disabled={
                            !dashboardState.selectedFile ||
                            dashboardState.loading
                          }
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
                  user?.profilePicture ||
                  "https://images.unsplash.com/photo-1552663651-2e4250e6c7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                }
                alt={`${user?.firstName || "User"} avatar`}
                className="rounded-full object-cover"
              />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
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
              <form
                className="space-y-4"
                onSubmit={handleUserDetailsFormSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleUserDetailsChange(e)
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2.5">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleUserDetailsChange(e)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleUserDetailsChange(e)
                    }
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
