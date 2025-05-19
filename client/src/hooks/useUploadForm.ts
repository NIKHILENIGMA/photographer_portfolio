import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
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
    date: null,
    description: "",
  } as FormDetails);

  // const getDate = useCallback(
  //   (date: Date) => {
  //     setFormDetails({
  //       ...formDetails,
  //       date: date,
  //     } as FormDetails);
  //   },
  //   [formDetails]
  // );

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

    const { title, location, date, description } = formDetails;
    console.log("Form Details:", formDetails);

    if (!title || !location || !date || !description) {
      alert("Please fill in all fields.");
      return;
    }

    // addPhotoMutation.mutate({ file: selectedFile!, data: formDetails });
    // setFormDetails({
    //   title: "",
    //   location: "",
    //   date: null,
    //   description: "",
    // });
    // setPreview("");
    // setSelectedFile(null);
  };

  return {
    inputRef,
    preview,
    formDetails,
    setFormDetails,
    getDate,
    handleImageChange,
    handleFileRemove,
    handleInputChange,
    handleFormSubmit,
  };
};
