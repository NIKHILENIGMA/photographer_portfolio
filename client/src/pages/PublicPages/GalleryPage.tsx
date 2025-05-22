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
  const { data, isLoading, isError } = usePhotosQuery();
  // console.log("Photos:", data.data.photos);

  const photos = data?.data.photos || [];

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
        <div className="flex justify-center items-center min-h-screen border-[1px] border-red-500 rounded-lg">
          <p className="text-2xl text-red-600 bg-red-200">
            Error loading images
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-2 sm:gap-4">
          {photos?.map((image: Images, index: number) => (
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
      <div className="absolute w-full bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[80vw] h-[60vh] bg-background flex p-8 space-x-4">
            <div className="flex flex-col justify-start items-start w-[30%]">
              <DialogHeader className="w-full">
                <DialogTitle className="text-lg font-semibold text-wrap">
                  {dialogData?.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-2">
                  {dialogData?.description}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="flex items-center justify-center w-[70%] h-full">
              <img
                src={dialogData.imageUrl}
                alt={dialogData.title}
                className="w-full h-[50vh] object-cover rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryPage;
