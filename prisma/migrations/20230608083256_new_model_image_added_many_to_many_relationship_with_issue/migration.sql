-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImageToIssue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToIssue_AB_unique" ON "_ImageToIssue"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToIssue_B_index" ON "_ImageToIssue"("B");

-- AddForeignKey
ALTER TABLE "_ImageToIssue" ADD CONSTRAINT "_ImageToIssue_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToIssue" ADD CONSTRAINT "_ImageToIssue_B_fkey" FOREIGN KEY ("B") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
