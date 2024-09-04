-- AlterTable
ALTER TABLE "issue-tracker"."Issue" ADD COLUMN     "developerId" INTEGER;

-- CreateTable
CREATE TABLE "issue-tracker"."Developer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "experience" INTEGER NOT NULL,
    "designation" VARCHAR(100) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "issue-tracker"."Issue" ADD CONSTRAINT "Issue_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "issue-tracker"."Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
