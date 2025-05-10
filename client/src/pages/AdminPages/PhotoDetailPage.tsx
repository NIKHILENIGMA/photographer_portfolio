import { FC } from "react";
import { useParams } from "react-router";

const PhotoDetailPage: FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const parsedPhotoId = photoId ? parseInt(photoId, 10) : null;

  // Fetch photo details using photoId
  // const { data, error, isLoading } = useFetchPhotoDetails(photoId);
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading photo details</div>;
  // if (!data) return <div>No photo found</div>;

  console.log(`Photo ID: ${parsedPhotoId}`);
  
  return (
    <div className="p-5 text-gray-800 font-MonaSans">
      <div className="text-center mb-5">
        <img
          src="https://via.placeholder.com/800"
          alt="Photo"
          className="max-w-full rounded-lg"
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Photo Title</h1>
        <p className="text-base text-gray-600 mb-5">
          A brief description of the photo goes here. It provides context and
          details about the image.
        </p>
        <div className="text-sm text-gray-500">
          <p>
            <strong>Date:</strong> January 1, 2023
          </p>
          <p>
            <strong>Location:</strong> New York City, USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
