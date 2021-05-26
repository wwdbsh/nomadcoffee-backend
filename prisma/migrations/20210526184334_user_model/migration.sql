-- DropIndex
DROP INDEX "User.avatarURL_unique";

-- DropIndex
DROP INDEX "User.githubUsername_unique";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "githubUsername" DROP NOT NULL;
