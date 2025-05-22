import { FC } from "react";

interface RenderImageProps {
  title: string;
  description?: string;
  location?: string;
  date?: string;
}

const RenderImage: FC<RenderImageProps> = ({ title, description, location, date }) => {
  return (
    <div className="max-w-3xl mx-auto bg-background p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
      <p className="text-base text-muted-foreground mb-6">
        {description || "No description available."}
      </p>
      <div className="text-sm text-gray-500 space-y-2">
        <p className="flex items-center gap-2">
          <strong>Date:</strong> {date || "No date available."}
        </p>

        <p className="flex items-center gap-2">
          <strong>Location:</strong>
          {location || "No location available."}
        </p>
      </div>
    </div>
  );
};

export default RenderImage;
