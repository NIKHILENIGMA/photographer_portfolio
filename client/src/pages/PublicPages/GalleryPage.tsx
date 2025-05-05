import { FC, useEffect, useState } from "react";
import { gallery } from "../../app/constants";
import { IoMdClose } from "react-icons/io";

const GalleryPage: FC = () => {
  const [spans, setSpans] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Initialize spans on component mount
  useEffect(() => {
    const initialSpans: Record<number, string> = {};
    gallery.forEach((image, index) => {
      // Use existing span or generate a random one
      initialSpans[index] = image.span || getRandomSpan();
    });
    setSpans(initialSpans);
  }, []);

  // Helper function to generate random span classes
  const getRandomSpan = () => {
    const rowSpans = ["row-span-1", "row-span-2", "row-span-3"];
    const colSpans = ["col-span-1", "col-span-2"];

    const rowSpan = rowSpans[Math.floor(Math.random() * rowSpans.length)];
    const useColSpan = Math.random() > 0.7;
    const colSpan = useColSpan
      ? colSpans[Math.floor(Math.random() * colSpans.length)]
      : "col-span-1";

    return `${rowSpan} ${colSpan}`;
  };

  // Get responsive span based on screen size
  const getResponsiveSpan = (index: number) => {
    if (!spans[index]) return "row-span-1 col-span-1";

    // On mobile, limit the spans
    if (window.innerWidth < 640) {
      return "row-span-1 col-span-1";
    } else if (window.innerWidth < 768) {
      // For small tablets, allow some row variation but limit column spans
      return spans[index].replace(/col-span-\d+/, "col-span-1");
    } else {
      // For larger screens, use the full spans
      return spans[index];
    }
  };

  const handleDialogOpen = (source: string) => {
    setShowModal(true);
    const image = gallery.find((img) => img.src === source);
    if (image) {
      setSelectedImage(image.src);
    }
  };
  



  return (
    <div className="w-full min-h-screen p-2 sm:p-5 mx-auto bg-(--background) relative">
      {showModal && (
        <dialog
          open
          className="fixed w-full h-screen inset-0 z-50 flex items-center justify-center bg-black/20 backdrop:backdrop-blur-2xl bg-opacity-50"
        >
          <div className="flex flex-col items-center justify-center w-[70%] h-[90%] p-10 bg-white rounded-lg shadow-lg relative overflow-hidden">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain border-black"
              loading="lazy"
            />

            <button
              className="absolute px-4 py-2 end-10 top-10  rounded-lg hover:bg-(--accent) cursor-pointer transition duration-300"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose />
            </button>
          </div>
        </dialog>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[150px] sm:auto-rows-[200px] gap-2 sm:gap-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className={`${getResponsiveSpan(
              index
            )} relative overflow-hidden p-1 cursor-pointer`}
            onClick={() => handleDialogOpen(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
