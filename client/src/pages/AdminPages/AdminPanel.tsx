import { FC } from "react";
import { Stats, ContactDetails } from "../../components";
// import { usePhotoQuery } from "../../hooks/usePhotos";
// import { IoPencil } from "react-icons/io5";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { usePhotoMutation } from "../../hooks/usePhotoMutation";
import UploadForm from "./../../components/Common/UploadForm";

// interface IPhoto {
//   id: string;
//   title: string;
//   description: string;
//   location: string | null;
//   imageUrl: string;
//   photoPublicId: string;
//   date: string;
//   createdAt: string;
//   updatedAt: string;
// }

const AdminPanel: FC = () => {
  // const { photosQuery } = usePhotoQuery();
  // const { deletePhotoMutation } = usePhotoMutation();
  // const { data: photos, isPending } = photosQuery;

  // const handleDeletePhoto = async (id: string) => {
  //   await deletePhotoMutation.mutateAsync(id);
  // };

  return (
    <div className="w-full min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Stats />

      <ContactDetails />

      <UploadForm />
      <div className="mt-2 p-2 min-h-[40vh] overflow-auto">
        {/* {isPending ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {(photos.data as IPhoto[]).map((image: IPhoto, index: number) => (
              <div
                key={index}
                className="flex justify-center relative overflow-hidden "
              >
                <div className="absolute top-2 end-2.5 p-2 space-x-2.5">
                  <button className="p-2 rounded-full cursor-pointer">
                    <IoPencil color="green" size={20} />
                  </button>
                  <button
                    className="p-2 rounded-full cursor-pointer"
                    onClick={() => handleDeletePhoto(image.id)}
                  >
                    <FaRegTrashAlt color="red" size={20} />
                  </button>
                </div>
                <img
                  src={image.imageUrl}
                  alt={`${image.title}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AdminPanel;
