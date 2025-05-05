import { FC, useState } from "react";
import Container from "../../container";
// import { gallery } from "../../app/constants";
import { UploadForm, Stats, ContactDetails } from "../../components";
import { usePhotoQuery } from "../../hooks/usePhoto";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { usePhotoMutation } from "../../hooks/usePhotoMutation";

interface IPhoto {
  id: string;
  title: string;
  description: string;
  location: string | null;
  imageUrl: string;
  photoPublicId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const AdminPanel: FC = () => {
  const [toggle, setToggle] = useState<"images" | "upload">("images");
  const { photosQuery } = usePhotoQuery();
  const { deletePhotoMutation } = usePhotoMutation();
  const { data: photos, isPending } = photosQuery;

  const handleDeletePhoto = async (id: string) => {
    await deletePhotoMutation.mutateAsync(id);
  };

  return (
    <Container>
      <div className="w-full min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <ContactDetails />

        <Stats />

        <div className="mt-8 bg-white p-2">
          <div className="flex items-center justify-center mb-4 px-10 space-x-10">
            <button
              className="cursor-pointer px-4 py-2 rounded-lg"
              onClick={() => setToggle("images")}
            >
              Images
            </button>
            <button
              className="bg-amber-300  cursor-pointer px-4 py-2 rounded-lg"
              onClick={() => setToggle("upload")}
            >
              Upload
            </button>
          </div>

          {toggle === "images" ? (
            isPending ? (
              <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg">Loading...</p>
              </div>
            ) : (
              <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {(photos.data as IPhoto[]).map(
                  (image: IPhoto, index: number) => (
                    <div
                      key={index}
                      className="flex justify-center relative overflow-hidden "
                    >
                      <div className="absolute top-2 end-2.5 p-2 space-x-2.5">
                        <button className="bg-amber-300 p-2 rounded-full cursor-pointer">
                          <IoPencil />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded-full cursor-pointer"
                          onClick={() => handleDeletePhoto(image.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                      <img
                        src={image.imageUrl}
                        alt={`${image.title}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )
                )}
              </div>
            )
          ) : (
            <UploadForm />
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminPanel;
