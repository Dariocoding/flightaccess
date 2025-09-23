-- AlterTable
ALTER TABLE "public"."_ContactToContactTag" ADD CONSTRAINT "_ContactToContactTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_ContactToContactTag_AB_unique";
