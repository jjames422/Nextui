/*
  Warnings:

  - The values [CRYPTO] on the enum `WalletType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WalletType_new" AS ENUM ('FIAT', 'BTC', 'ETH', 'BNB', 'POLYGON');
ALTER TABLE "Wallet" ALTER COLUMN "type" TYPE "WalletType_new" USING ("type"::text::"WalletType_new");
ALTER TYPE "WalletType" RENAME TO "WalletType_old";
ALTER TYPE "WalletType_new" RENAME TO "WalletType";
DROP TYPE "WalletType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");
