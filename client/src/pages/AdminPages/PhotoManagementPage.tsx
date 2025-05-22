import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadForm } from "@/components";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Common/Loader";
import { usePhotoManagement } from "@/hooks/usePhotoManagement";

interface ImageInterface {
  id: string;
  title: string;
  description: string;
  date: string | null;
  imageUrl: string;
  location: null;
  photoPublicId: string;
  createdAt: object;
  updatedAt: object;
}

const PhotoManagementPage = () => {
  const {
    inputRef,
    openSheet,
    setOpenSheet,
    file,
    setFile,
    search,
    setSearch,
    filteredPhotos,
    formData,
    handleImageClick,
    handleFormChange,
    handleImageChange,
    handleUploadImage,
    handleUpdateFormSubmission,
    handleImageDeletion,
    isLoading,
  } = usePhotoManagement();
  return (
    <div className="p-4 font-Roboto">
      <h1 className="text-2xl font-semibold mb-2">Photo Management</h1>
      <p className="text-muted-foreground/60 mb-4">
        Manage your gallery images. Add new images, edit existing ones, or view
        details.
      </p>
      <div className="relative mb-4 space-x-1.5 flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-[75%] h-14 p-1 flex items-center">
          <Input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search images..."
            className="w-full sm:w-3/4 mb-4 sm:mb-0"
          />
        </div>
        <UploadForm />
      </div>
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          <Loader />
        ) : filteredPhotos.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center w-full min-h-full">
            <p className="text-muted-foreground/60">
              No images found. Please add some images.
            </p>
          </div>
        ) : (
          filteredPhotos?.map((image: ImageInterface, index) => (
            <Card
              key={index + image.id}
              className="cursor-pointer shadow-md hover:shadow-sm hover:opacity-85 transition-shadow duration-300 p-4"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative mb-4">
                <img
                  src={image.imageUrl}
                  className="w-full h-48 object-cover rounded-t-md"
                  alt={`Image ${image.title}`}
                />
              </div>
              <div className="p-2">
                <h2 className="text-lg font-semibold mb-2">{image.title}</h2>
                <p className="text-gray-600 text-sm truncate">
                  {image.description || "No description available."}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="overflow-y-auto max-h-screen p-2 hiden-scrollbar font-Roboto">
          <SheetHeader>
            <SheetTitle>Update Your Photo</SheetTitle>
            <SheetDescription>The Photo details.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4">
            <form onSubmit={handleUpdateFormSubmission} className="space-y-2">
              <div className="px-5">
                <Label htmlFor="image" className="font-semibold">
                  Change Image:
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={inputRef}
                  placeholder="Choose image"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="relative w-full min-h-64 bg-background rounded-xl mb-6 flex flex-col items-center justify-center space-y-1.5">
                  {file ? (
                    <div className="relative w-full min-h-64 bg-background rounded-xl mb-6 flex flex-col items-center justify-center space-y-1.5">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-80 object-cover rounded-xl shadow-sm"
                      />
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={"default"}
                          onClick={handleUploadImage}
                          className=""
                        >
                          Upload Image
                        </Button>
                        <Button
                          type="button"
                          variant={"outline"}
                          onClick={() => {
                            setFile(null);
                            if (inputRef.current) {
                              inputRef.current.value = "";
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-80 object-cover rounded-xl shadow-sm"
                      />
                      <Button
                        type="button"
                        variant={"default"}
                        onClick={() => inputRef.current?.click()}
                        className=""
                      >
                        Change Image
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="px-5">
                <Label htmlFor="title" className="font-medium">
                  Title:
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter photo title"
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="px-5">
                <Label htmlFor="location" className="font-medium">
                  location:
                </Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter photo location"
                  value={formData.location}
                  onChange={handleFormChange}
                />
              </div>
              <div className="px-5">
                <Label htmlFor="description" className="font-medium">
                  Description:
                </Label>
                <Textarea
                  className="resize-none"
                  id="description"
                  name="description"
                  placeholder="Enter photo title"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>

              <div className="flex px-5 space-x-2 py-2">
                <Button
                  variant={"default"}
                  type="submit"
                  className="w-1/2 cursor-pointer"
                >
                  Update Photo
                </Button>
                <Button
                  variant={"secondary"}
                  type="button"
                  className="w-1/2 cursor-pointer"
                  onClick={() => handleImageDeletion(formData.id)}
                >
                  Delete
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PhotoManagementPage;
