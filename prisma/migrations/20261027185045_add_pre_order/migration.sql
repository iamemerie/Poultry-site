-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('CHICKEN', 'GOAT', 'SWINE', 'CATTLE', 'TURKEY', 'SHEEP');

-- CreateEnum
CREATE TYPE "Product" AS ENUM ('EGGS', 'MEAT', 'LIVE_ANIMAL', 'BREEDING_STOCK', 'MILK');

-- CreateEnum
CREATE TYPE "PreOrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FULFILLED', 'CANCELLED');

-- CreateTable
CREATE TABLE "PreOrder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "animal" "Animal" NOT NULL,
    "product" "Product" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "deliveryArea" TEXT NOT NULL,
    "status" "PreOrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreOrder_pkey" PRIMARY KEY ("id")
);
