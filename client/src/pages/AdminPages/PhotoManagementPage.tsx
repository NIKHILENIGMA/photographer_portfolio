// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
// import AddImage from "@/components/Common/AddImage";
import { UploadForm } from "@/components";
import { usePhotosQuery } from "@/hooks/usePhotos";

// const images = [
//   {
//     id: "1",
//     title: "Image 1",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "2",
//     title: "Image 2",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "3",
//     title: "Image 3",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "4",
//     title: "Image 4",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "5",
//     title: "Image 5",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "6",
//     title: "Image 6",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "7",
//     title: "Image 7",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "8",
//     title: "Image 8",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "9",
//     title: "Image 9",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },

//   {
//     id: "10",
//     title: "Image 10",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D0",
//   },
//   {
//     id: "11",
//     title: "Image 11",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     id: "12",
//     title: "Image 12",
//     url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
// ];

interface ImageInterface {
  id: string;
  title: string;
  description: string;
  date: string | null;
  imageUrl: string;
  location: null;
  photoPublicId: string;
  createdAt: string;
  updatedAt: string;
}
const PhotoManagementPage = () => {
  const navigate = useNavigate();
  const { data } = usePhotosQuery();
  const images: ImageInterface[] = data?.data;

  const handleImageClick = (imageId: string) => {
    navigate(`${imageId}`);
  };

  return (
    <div className="p-4 font-MonaSans">
      <h1 className="text-2xl font-semibold mb-2">Photo Management</h1>
      <p className="text-muted-foreground/60 mb-4">
        Manage your gallery images. Add new images, edit existing ones, or view
        details.
      </p>
      <div className="relative mb-4 space-x-1.5 flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-[75%] h-14 p-1 flex items-center">
          <Input
            type="text"
            placeholder="Search images..."
            className="w-full sm:w-3/4 mb-4 sm:mb-0"
          />
        </div>
        <UploadForm />
      </div>
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images?.map((image: ImageInterface, index) => (
          <Card
            key={index + image.id}
            className="cursor-pointer shadow-md hover:shadow-sm hover:opacity-85 transition-shadow duration-300 p-4"
            onClick={() => handleImageClick(image.id)}
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
        ))}
      </div>
    </div>
  );
};

export default PhotoManagementPage;
