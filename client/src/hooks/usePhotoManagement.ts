import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  useDeletePhotoMutation,
  usePhotosQuery,
  useUpdateImageMutation,
  useUpdatePhotoDetailsMutation,
} from "@/hooks/usePhotos";

interface FormData {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date | null;
  imageUrl: string;
}

interface ImageInterface {
  id: string;
  title: string;
  description: string;
  date: string | null;
  imageUrl: string;
  location: null;
  photoPublicId: string;
  createdAt: object;
  updatedAt: object;
}

export const usePhotoManagement = () => {
  const { data, isLoading } = usePhotosQuery();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredPhotos, setFilteredPhotos] = useState<ImageInterface[]>([]);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    title: "",
    description: "",
    location: "",
    date: null,
    imageUrl: "",
  });
  const { mutateAsync: updatePhotoImageMutation } = useUpdateImageMutation();
  const { mutateAsync: updatePhotoDetailsMutation } =
    useUpdatePhotoDetailsMutation();
  const { mutateAsync: deletePhotoMutation } = useDeletePhotoMutation();

  //
  const handleImageClick = (image: ImageInterface) => {
    setOpenSheet(true);
    setFormData({
      id: image.id,
      title: image.title,
      description: image.description,
      location: image.location || "",
      date: new Date(image.date || ""),
      imageUrl: image.imageUrl,
    });
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageChange = async () => {
    const selectedFile = inputRef.current?.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      alert("Please select an image file.");
      return;
    }
    await updatePhotoImageMutation({
      id: formData.id, // Replace with the actual photo ID
      photo: file, // The new image file
    });

    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setOpenSheet(false);
  };

  const handleImageDeletion = async (id: string) => {
    await deletePhotoMutation(id);
    setOpenSheet(false);
  };

  const handleUpdateFormSubmission = async (e: FormEvent) => {
    e.preventDefault();

    await updatePhotoDetailsMutation({
      id: formData.id,
      data: {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date ? new Date(formData.date) : undefined,
      },
    });

    setOpenSheet(false);
  };

  useEffect(() => {
    if (!data) return;
    const filtered = data.data.photos.filter((image: ImageInterface) =>
      image.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPhotos(filtered);
  }, [data, search]);

  return {
    inputRef,
    openSheet,
    setOpenSheet,
    file,
    setFile,
    search,
    setSearch,
    filteredPhotos,
    formData,
    setFormData,
    handleImageClick,
    handleFormChange,
    handleImageChange,
    handleUploadImage,
    handleUpdateFormSubmission,
    handleImageDeletion,
    isLoading,
  };
};
