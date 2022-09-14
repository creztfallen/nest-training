-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRES', 'DONE');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
