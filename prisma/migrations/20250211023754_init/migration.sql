/*
  Warnings:

  - You are about to drop the column `user_name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_PostToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "user_name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PostToUser";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
