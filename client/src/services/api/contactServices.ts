const API_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  message: string;
}

export const addContact = async (contact: IContact) => {
  try {
    const response = await fetch(`${API_URL}/contacts/add-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Failed to add contact");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getContacts = async () => {
  try {
    const response = await fetch(`${API_URL}/contacts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get contacts");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
