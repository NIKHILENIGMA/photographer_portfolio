import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUploadForm } from "@/hooks/useUploadForm";

const UploadForm: FC = () => {
  const {
    inputRef,
    preview,
    formDetails,
    handleImageChange,
    handleInputChange,
    handleFormSubmit,
  } = useUploadForm();

  return (
    <Sheet>
      <SheetTrigger className="bg-(--secondary) p-2 rounded-lg cursor-pointer">
        Upload Image
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle>Upload Image</SheetTitle>
          <SheetDescription>
            Upload your image and provide details about it.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          <div className="w-full space-y-6">
            <label className="inline-block  transition-all cursor-pointer">
              Choose Image
            </label>
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              onClick={() => inputRef.current?.click()}
              className="w-full h-80 bg-gray-50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              ) : (
                <span className="text-gray-500 font-medium flex items-center justify-center cursor-pointer hover:text-blue-500 transition-colors">
                  No image selected
                </span>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formDetails?.title || ""}
                  placeholder="Enter image title"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="text-gray-700 font-medium mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formDetails?.location || ""}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="text-gray-700 font-medium mb-2"
                >
                  Date Taken
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={
                    formDetails?.date
                      ? formDetails.date.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={6}
                  value={formDetails?.description || ""}
                  placeholder="Enter image description"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                  minLength={10}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full max-w-xs px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Upload Image
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UploadForm;
