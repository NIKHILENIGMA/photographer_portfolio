/*
  Warnings:

  - You are about to drop the column `avatarImage` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarImage",
ADD COLUMN     "avatar_image" TEXT,
ADD COLUMN     "cloudinary_public_id" TEXT;
