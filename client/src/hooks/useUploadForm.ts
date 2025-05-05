import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { usePhotoMutation } from "./usePhotoMutation";

interface FormDetails {
  title: string;
  location?: string;
  date?: Date | null;
  description: string;
}

export const useUploadForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addPhotoMutation } = usePhotoMutation();
  const [formDetails, setFormDetails] = useState<FormDetails | null>({
    title: "",
    location: "",
    photographer: "",
    date: null,
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      setFormDetails((prev) => ({
        ...prev!,
        date: value ? new Date(value) : null,
      }));
    } else {
      setFormDetails(
        (prevDetails) =>
          ({
            ...prevDetails,
            [name]: value || null,
          } as FormDetails)
      );
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formDetails) return;

    const { title, location, date, description } = formDetails;

    if (!title || !location || !date || !description) {
      alert("Please fill in all fields.");
      return;
    }

    addPhotoMutation.mutate({ file: selectedFile!, data: formDetails });
    setFormDetails({
      title: "",
      location: "",
      date: null,
      description: "",
    });
    setPreview("");
    setSelectedFile(null);
  };

  return {
    inputRef,
    preview,
    formDetails,
    handleImageChange,
    handleInputChange,
    handleFormSubmit,
  };
};
