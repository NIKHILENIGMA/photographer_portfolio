import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password is required").optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password is required"),
  })
