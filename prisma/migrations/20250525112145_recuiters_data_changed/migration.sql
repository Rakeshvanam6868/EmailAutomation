-- AlterTable
ALTER TABLE "Recruiter" ADD COLUMN     "customBody" TEXT,
ADD COLUMN     "customSubject" TEXT,
ADD COLUMN     "isEmailCustomized" BOOLEAN NOT NULL DEFAULT false;
