import { FC } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUploadForm } from "@/hooks/useUploadForm";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";

const UploadForm: FC = () => {
  const {
    inputRef,
    preview,
    formDetails,
    handleFileRemove,
    handleImageChange,
    handleInputChange,
    handleFormSubmit,
  } = useUploadForm();

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="bg-primary text-white py-0 px-2 h-10 rounded-md cursor-pointer"
      >
        <Button variant="default" className="h-10">
          Upload Image
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen p-2">
        <SheetHeader>
          <SheetTitle>Upload Image</SheetTitle>
          <SheetDescription>
            Upload your image and provide details about it.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4"
        >
          <div className="w-full space-y-2">
            <Label className=" cursor-pointer">Choose Image</Label>
            <Input
              type="file"
              ref={inputRef}
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-gray-500 text-xs px-1">
              Click to upload an image
            </span>
            {preview ? (
              <div className="relative w-full min-h-64 bg-gray-50 rounded-xl mb-6 flex items-center justify-center ">
                <span
                  className="absolute top-4 right-4 text-gray-500 font-medium cursor-pointer hover:text-red-500 transition-colors"
                  onClick={handleFileRemove}
                >
                  <Trash2 color="red" size={14} />
                </span>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-xl shadow-sm"
                />
              </div>
            ) : (
              <div
                onClick={() => inputRef.current?.click()}
                className="w-full h-64 bg-gray-50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary transition-colors"
              >
                <span className="text-gray-500 font-medium flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
                  No image selected
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="title" className=" font-medium mb-2">
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formDetails?.title || ""}
                  placeholder="Enter image title"
                  onChange={handleInputChange}
                  className="w-full "
                  required
                />

                <span className="text-gray-500 text-xs px-1">
                  Enter a title for the image. This will be displayed as the
                  main heading.
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formDetails?.location || ""}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="w-full"
                  required
                />
                <span className="text-gray-500 text-xs px-1">
                  Enter the location where the image was taken.
                </span>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Your Message</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message-2"
                  name="description"
                  value={formDetails?.description || ""}
                  onChange={handleInputChange}
                  className="resize-none h-32"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Write a brief description of the image.
                </p>
              </div>
            </div>
          </div>

          <SheetFooter className="flex w-full mt-6">
            <Button
              type="submit"
              className="cursor-pointer"
              variant={"default"}
            >
              Upload
            </Button>
            <SheetClose asChild>
              <Button variant={"outline"} type="submit">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UploadForm;
