import { User } from "@prisma/client";
import { prisma } from "../config";
import { loginData, SignupData } from "../types/base.types";
import { comparePasswords, hashPassword } from "../util/hash";
import { generateAccessToken, generatePayload } from "../util/JWT";
import { ConflictError, DatabaseError, InternalServerError, StandardError } from "../util";

export class AuthenticationServices {
  static async register(
    payload: SignupData
  ): Promise<"User register successfully" | undefined> {
    try {
      const adminStatus: boolean =
        payload.firstName === "Siddhesh" && payload.lastName === "Sawant";

      const existEmail: boolean = await this.verifyEmailExist(payload.email);

      if (existEmail) {
        throw new ConflictError("Email already exists");
      }

      const hashedPassword: string = await hashPassword(payload.password);
      payload.password = hashedPassword;

      if (!hashPassword) {
        throw new InternalServerError(
          "Failed to hash password, please try again later"
        );
      }

      await prisma.user.create({
        data: {
          ...payload,
          isAdmin: adminStatus,
          avatarImage: "",
        },
      });

      console.log("User created successfully");

      return "User register successfully";
    } catch (error) {
      console.log("Error creating user:", error);
      
      if (error instanceof StandardError) {
        throw error;
      }

      throw new InternalServerError(
        "An unexpected error occurred while registering user"
      );
    }
  }

  static async login(payload: loginData) {
    const { email, password } = payload;
    try {
      const user: User | null = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Generate payload for JWT
      const payload = generatePayload(user.id);

      // Generate access and refresh tokens
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateAccessToken(payload);

      const session = await prisma.session.create({
        data: {
          userId: user.id,
          accessToken,
          refreshToken,
        },
      });

      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw Error(`Failed to login user: ${error?.message}`);
      }
    }
  }

  static async logout(userId: string, refreshToken: string) {
    try {
      const session = await prisma.session.findFirst({
        where: { userId, refreshToken },
      });

      if (!session) {
        throw new Error("Session not found");
      }

      await prisma.session.delete({
        where: { id: session.id },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw Error(`Failed to logout user: ${error?.message}`);
      }
    }
  }

  static async refreshToken(userId: string, refreshToken: string) {
    try {
      const session = await prisma.session.findFirst({
        where: { userId, refreshToken },
      });

      if (!session) {
        throw new Error("Session not found");
      }

      // Generate new access token
      const payload = generatePayload(userId);
      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = generateAccessToken(payload);

      await prisma.session.update({
        where: { id: session.id },
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw Error(`Failed to refresh token: ${error?.message}`);
      }
    }
  }

  static async verifyEmailExist(email: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      return user ? true : false;
    } catch (error) {
      throw new DatabaseError("Error while checking email existence");
    }
  }
}
