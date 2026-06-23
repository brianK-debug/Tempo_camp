-- CreateTable
CREATE TABLE "bookings" (
    "id" VARCHAR(64) NOT NULL,
    "confirmationCode" VARCHAR(32) NOT NULL,
    "accommodation" TEXT NOT NULL,
    "rateType" TEXT NOT NULL,
    "ratePlan" TEXT NOT NULL,
    "basePriceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KSH',
    "nights" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "addOnsJson" JSONB NOT NULL,
    "addOnTotalCents" INTEGER NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "guestName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "specialRequests" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "source" TEXT NOT NULL DEFAULT 'web',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_confirmationCode_key" ON "bookings"("confirmationCode");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_createdAt_idx" ON "bookings"("createdAt");

-- CreateIndex
CREATE INDEX "bookings_email_idx" ON "bookings"("email");

-- CreateIndex
CREATE INDEX "bookings_phone_idx" ON "bookings"("phone");
