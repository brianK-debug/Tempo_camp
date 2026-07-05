-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "checkIn" TIMESTAMP(3),
ADD COLUMN     "checkOut" TIMESTAMP(3),
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "notices" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);
