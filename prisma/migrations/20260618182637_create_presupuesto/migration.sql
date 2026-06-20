/*
  Warnings:

  - You are about to drop the column `imagenUrl` on the `Madera` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Madera" DROP COLUMN "imagenUrl",
ADD COLUMN     "imagen_url" TEXT;

-- CreateTable
CREATE TABLE "Presupuesto" (
    "id" SERIAL NOT NULL,
    "cliente_nombre" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "tipo_mueble" TEXT NOT NULL,
    "medidas" JSONB NOT NULL,
    "total_estimado" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "canal_ingreso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presupuesto_pkey" PRIMARY KEY ("id")
);
