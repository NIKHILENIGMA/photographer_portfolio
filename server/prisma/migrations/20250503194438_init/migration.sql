-- CreateTable
CREATE TABLE "photographer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "photographer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "photographerId" INTEGER NOT NULL,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photographer_email_key" ON "photographer"("email");

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "photographer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
