import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useDeletePhotoMutation,
  usePhotoQuery,
  useUpdatePhotoMutation,
} from "@/hooks/usePhotos";
import { ArrowLeft, Pencil, Trash2Icon } from "lucide-react";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Trash2 } from "lucide-react";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { DatePicker } from "@/components/Common/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFormDetails } from "@/types";
import RenderImage from "@/components/Common/RenderImage";
import { Label } from "@/components/ui/label";

const PhotoDetailPage: FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const navigate = useNavigate();

  const { photo } = usePhotoQuery(photoId!);

  const { mutateAsync: deleteMutation, isPending: isDeleting } =
    useDeletePhotoMutation();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdatePhotoMutation();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoId) return;

    const updateData: UpdateFormDetails = {
      title: formState.title,
      description: formState.description,
      location: formState.location,
      date: formState.date ? new Date(formState.date) : null,
      // image: imageFile || null, // Adjust based on the expected type
    };

    try {
      await updateMutation({ id: photoId, data: updateData });
      navigate("/admin/photo-management");
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const handleRemoveImage = () => {};

  const handleDeletePhoto = async () => {
    if (!photoId) return;
    try {
      await deleteMutation(photoId);
      navigate("/admin/photo-management");
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };
  return (
    <div className="p-5 text-gray-800 font-['MonaSans']">
      <div className="flex justify-between mb-5">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"default"} className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                {isUpdating ? "Edit..." : "Edit"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit photo</SheetTitle>
                <SheetDescription>
                  Make changes to your photo details here. You can update the
                  title, description, date, and location of the photo.
                </SheetDescription>
              </SheetHeader>
              <form className="p-5" onSubmit={handlePhotoEdit}>
                <div className="flex flex-col space-y-2 mb-4 p-1">
                  <Label htmlFor="image">Choose Image: </Label>
                  <Input
                    type="file"
                    name="photo"
                    id="image"
                    className="hidden"
                  />
                  <div className="relative border-2 border-dashed border-primary/80 rounded-lg p-2 ">
                    {photo.imageUrl ? (
                      <div>
                        <button
                          className="absolute text-red-500 top-4 right-4 cursor-pointer"
                          onClick={handleRemoveImage}
                        >
                          <Trash2Icon size={15} />
                        </button>
                        <img
                          src={photo.imageUrl}
                          alt="sada"
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <span className="text-gray-500 font-medium flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
                          No image selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Input
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  placeholder="Enter image title"
                />
                <Input
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
                <Textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  placeholder="Type your message here"
                />
                {/* Image preview logic stays as is with fallback */}
                <Button type="submit">
                  {isUpdating ? "Updating..." : "Upload"}
                </Button>
              </form>
            </SheetContent>
          </Sheet>

          <Button
            variant="default"
            onClick={handleDeletePhoto}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
      <div className="text-center mb-5">
        <img
          src={photo.imageUrl}
          alt={`Image ${"photo.data?.title"}`}
          className="w-full h-[40vh] md:h-[70vh] object-cover max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>
      <RenderImage photo={photo} />
    </div>
  );
};

export default PhotoDetailPage;
