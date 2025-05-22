import { AddFormDetails } from "@/types";

const API_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const addPhoto = async (data: AddFormDetails) => {
  try {
    const formData = new FormData();
    formData.append("photo", data.photo!);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location || "");

    const response = await fetch(`${API_URL}/photos/add-image/`, {
      method: "POST",
      body: formData,
      credentials: "include", // Include credentials for cross-origin requests
      
    });

    if (!response.ok) {
      throw new Error("Failed to add photo");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding photo:", error);
    throw error;
  }
};

export type UpdatePhotoDetailsInput = {
  title?: string;
  description?: string;
  location?: string;
  date?: Date | string;
};

export const updatePhotoDetails = async (
  id: string,
  photoDetails: UpdatePhotoDetailsInput
) => {
  try {
    const response = await fetch(`${API_URL}/photos/details/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(photoDetails),
      credentials: "include", // Include credentials for cross-origin requests
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update photo");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const updatePhotoImage = async (id: string, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  try {
    const response = await fetch(`${API_URL}/photos/image/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include", // Include credentials for cross-origin requests
    });

    if (!response.ok) {
      throw new Error("Failed to update photo image");
    }

    await response.json();
  } catch (error) {
    console.error("Error updating photo image:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deletePhoto = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/photos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for cross-origin requests
    });

    if (!response.ok) {
      throw new Error("Failed to delete photo");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}/photos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for cross-origin requests
    });

    if (!response.ok) {
      throw new Error("Failed to get photos");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting photos:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getPhotoById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/photos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for cross-origin requests
    });

    if (!response.ok) {
      throw new Error("Failed to get photo details");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting photo details:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
