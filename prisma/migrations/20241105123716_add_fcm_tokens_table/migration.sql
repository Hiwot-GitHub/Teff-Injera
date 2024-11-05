-- CreateTable
CREATE TABLE "FCMTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "deviceInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FCMTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FCMTokens_token_key" ON "FCMTokens"("token");
