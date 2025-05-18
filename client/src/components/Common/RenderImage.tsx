import { FC } from "react";

interface RenderImageProps {
  photo: {
    title: string;
    description?: string;
    location?: string;
    date?: string;
  };
}

const RenderImage: FC<RenderImageProps> = ({ photo }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{photo.title}</h1>
      <p className="text-base text-gray-600 mb-6">
        {photo.description || "No description available."}
      </p>
      <div className="text-sm text-gray-500 space-y-2">
        <p className="flex items-center gap-2">
          <strong>Date:</strong> {photo.date || "No date available."}
        </p>

        <p className="flex items-center gap-2">
          <strong>Location:</strong>
          {photo.location || "No location available."}
        </p>
      </div>
    </div>
  );
};

export default RenderImage;
