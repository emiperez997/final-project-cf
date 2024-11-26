/*
  Warnings:

  - The primary key for the `post_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `post_category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `post_category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post_category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "post_category_postId_categoryId_key";

-- AlterTable
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "post_category_pkey" PRIMARY KEY ("postId", "categoryId");
