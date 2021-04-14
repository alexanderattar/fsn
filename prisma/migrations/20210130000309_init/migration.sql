-- CreateTable
CREATE TABLE "EnsName" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
