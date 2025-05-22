const API_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const addAvatar = async (avatar: File) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  try {
    const response = await fetch(`${API_URL}/admin/add-avatar`, {
      method: "POST",

      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add avatar");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      const errMessage = error.message;
      console.error("Error adding avatar:", errMessage);
      if (errMessage.includes("Avatar already exists")) {
        throw new Error(errMessage);
      }
    }
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const removeAvatar = async () => {
  try {
    await fetch(`${API_URL}/admin/remove-avatar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const updateDetails = async ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  await fetch(`${API_URL}/admin/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email }),
    credentials: "include",
  });
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const response = await fetch(`${API_URL}/admin/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
