import { prisma } from "../config";
import { updateProfileData } from "../types/base.types";
import { getFullPath } from "../util/getFullPath";
import { hashPassword } from "../util/hash";

export class AdminService {
  static async addAvatar(userId: string, avatarUrl: string) {
    const fullPath = getFullPath(avatarUrl);

    return await prisma.user.update({
      where: { id: userId },
      data: {
        avatarImage: avatarUrl,
        cloudinaryPublicId: fullPath,
      },
    });
  }

  static async findPublicId(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cloudinaryPublicId: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.cloudinaryPublicId!;
  }

  static async removeAvatar(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { avatarImage: "", cloudinaryPublicId: "" },
    });
  }

  static async updateUserProfile(userId: string, data: updateProfileData) {
    let hashedPassword: string | undefined = undefined;
    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }
    data.password = hashedPassword;

    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarImage: true,
        createdAt: true,
      }
    });
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
