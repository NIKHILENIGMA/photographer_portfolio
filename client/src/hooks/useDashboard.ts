import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { addAvatar, removeAvatar } from "@/services/api/adminServices";
import AuthService from "@/services/api/authServices";

interface DashboardState {
  isOpen: boolean;
  selectedFile: File | null;
  loading: boolean;
}

export const useDashboard = () => {
  const { user, setUser } = useAuthContext();
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    isOpen: false,
    selectedFile: null,
    loading: false,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateState = useCallback((updates: Partial<DashboardState>) => {
    setDashboardState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  }, []);

  const handleDialogOpen = useCallback(() => {
    updateState({ isOpen: !dashboardState.isOpen });
  }, [dashboardState.isOpen, updateState]);

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        e.preventDefault();

        const uploadFile: File | undefined = e.target.files?.[0];
        if (!uploadFile || uploadFile === undefined) {
          return;
        }
        // Check if the file is an image
        if (!uploadFile.type.startsWith("image/")) {
          console.error("Selected file is not an image");
          return;
        }

        // Check if the file size is less than 5MB
        if (uploadFile.size > 5 * 1024 * 1024) {
          console.error("File size exceeds 2MB");
          return;
        }
        // Check if the file is a valid image format
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(uploadFile.type)) {
          console.error("Invalid image format");
          return;
        }
        updateState({ selectedFile: uploadFile });
      } catch (error) {
        updateState({ loading: false });
        console.error(error);
      }
    },
    [updateState]
  );

  const handleFileUpload = useCallback(async () => {
    try {
      if (!dashboardState.selectedFile) {
        console.error("No file selected");
        return;
      }
      if (!user) {
        throw new Error("User not found");
      }

      updateState({ loading: true });
      await addAvatar(dashboardState.selectedFile);
      updateState({
        selectedFile: null,
        isOpen: false,
      });

      if (inputRef.current) {
        inputRef.current.value = ""; // Clear the file input
      }

      const updatedUser = await AuthService.getProfile(
        AuthService.getToken() as string
      ); // Fetch the updated user profile
      setUser({
        ...user,
        profilePicture: updatedUser.data.user?.profilePicture, // Update the user state with the new avatar
      });
      updateState({ loading: false });
    } catch (error) {
      updateState({ loading: false });
      console.error("Error uploading file:", error);
    }
  }, [dashboardState.selectedFile, user, setUser, updateState]);

  const handleRemoveAvatar = useCallback(async () => {
    if (!user) {
      throw new Error("User not found");
    }
    try {
      updateState({ loading: true });
      await removeAvatar();

      updateState({ selectedFile: null, isOpen: false });

      if (inputRef.current) {
        inputRef.current.value = ""; // Clear the file input
      }

      setUser({
        ...user,
        profilePicture: "", // Update the user state with the new avatar
      });

      updateState({ loading: false });
    } catch (error) {
      updateState({ loading: false });
      console.error("Error removing avatar:", error);
    }
  }, [user, setUser, updateState]);

  return {
    user,
    updateState,
    inputRef,
    dashboardState,
    setDashboardState,
    handleDialogOpen,
    handleFileChange,
    handleFileUpload,
    handleRemoveAvatar,
  };
};
