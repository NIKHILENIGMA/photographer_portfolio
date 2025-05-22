import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAddPhotoMutation } from "./usePhotos";

interface FormDetails {
  title: string;
  location?: string;
  description: string;
}

export const useUploadForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutateAsync: addPhotoMutation } = useAddPhotoMutation();
  const [formDetails, setFormDetails] = useState<FormDetails | null>({
    title: "",
    location: "",
    description: "",
  } as FormDetails);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }

      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    setPreview("");
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: Date | null } }
  ) => {
    const { name, value } = e.target;

    setFormDetails(
      (prevDetails) =>
        ({
          ...prevDetails,
          [name]: value || null,
        } as FormDetails)
    );
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formDetails) return;

    const { title, location, description } = formDetails;

    if (!title || !location || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const response = addPhotoMutation({
      title,
      location,
      description,
      photo: selectedFile,
    } as FormDetails);

    if (response) {
      console.log("Photo uploaded successfully:", response);
    } else {
      console.error("Error uploading photo");
      alert("Error uploading photo. Please try again.");
    }
    // Reset form details and preview
    setFormDetails({
      title: "",
      location: "",
      description: "",
    });
    setPreview("");
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
      })
    );
  };

  return {
    inputRef,
    preview,
    formDetails,
    setFormDetails,
    handleImageChange,
    handleFileRemove,
    handleInputChange,
    handleFormSubmit,
  };
};
