/*
  Warnings:

  - A unique constraint covering the columns `[shopId]` on the table `CoffeeShopPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShopPhoto.shopId_unique" ON "CoffeeShopPhoto"("shopId");
