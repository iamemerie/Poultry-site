-- DropIndex
DROP INDEX "ContactMessage_email_key";

-- CreateTable
CREATE TABLE "ProductStock" (
    "id" SERIAL NOT NULL,
    "animal" "Animal" NOT NULL,
    "product" "Product" NOT NULL,
    "available" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_animal_product_key" ON "ProductStock"("animal", "product");
