/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ALTER COLUMN "location" DROP NOT NULL;

-- DropTable
DROP TABLE "Location";
