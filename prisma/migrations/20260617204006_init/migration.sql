-- CreateTable
CREATE TABLE "Madera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "badge" TEXT,
    "imagen_url" TEXT,
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
