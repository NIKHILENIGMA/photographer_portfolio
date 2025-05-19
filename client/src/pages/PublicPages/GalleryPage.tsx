import { FC, useState } from "react";
import Loader from "@/components/Common/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePhotosQuery } from "@/hooks/usePhotos";

interface Images {
  id: string;
  title: string;
  description: string;
  location: string | null;
  imageUrl: string;
  photoPublicId: string;
  date: string | null;
  createdAt: string;
  updatedAt: string;
}

const GalleryPage: FC = () => {
  const { photos, isLoading, isError } = usePhotosQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<{
    imageUrl: string;
    title: string;
    description?: string;
  }>({ imageUrl: "", title: "", description: "" });

  return (
    <div className="w-full min-h-screen p-2 sm:p-5 mx-auto bg-[var(--background)] relative">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-2xl">Error loading images</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-2 sm:gap-4">
          {photos?.data?.map((image: Images, index: number) => (
            <div
              key={index}
              className="relative overflow-hidden p-1 cursor-pointer"
              onClick={() => {
                setDialogData({
                  imageUrl: image.imageUrl || "",
                  title: image.title || "Untitled",
                  description: image.description || "",
                });
                setIsDialogOpen(true);
              }}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{dialogData?.title}</DialogTitle>
            <DialogDescription>{dialogData?.description}</DialogDescription>
          </DialogHeader>
          <img
            src={dialogData.imageUrl}
            alt={dialogData.title}
            className="w-full h-[50vh] object-cover rounded-lg mt-4"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
