-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "specialization" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userName_key" ON "Student"("userName");
