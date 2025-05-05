
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";


export const addAvatar = async (avatar: File) => {
    try {
        const response = await fetch(`${API_URL}/admin/add-avatar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar }),
        })

        if (!response.ok) {
            throw new Error("Failed to add avatar");
        }
        const data = await response.json();

        return data; 

    } catch (error) {
        console.error("Error adding avatar:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}


export const removeAvatar = async () => {
    try {
        await fetch(`${API_URL}/admin/remove-avatar`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error)
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await fetch(`${API_URL}/admin/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ oldPassword, newPassword }),
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
}