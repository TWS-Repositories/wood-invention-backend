-- CreateTable
CREATE TABLE "Madera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "badge" TEXT,
    "imagenUrl" TEXT,
    "precio_m2" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Madera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Herraje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio_unidad" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Herraje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acabado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio_extra" DECIMAL(10,2) NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acabado_pkey" PRIMARY KEY ("id")
);
