import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env["DATABASE_URL"]!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpiar tablas existentes (opcional, útil en desarrollo)
  await prisma.acabado.deleteMany();
  await prisma.herraje.deleteMany();
  await prisma.madera.deleteMany();

  // ----- Maderas -----
  const maderas = await prisma.madera.createMany({
    data: [
      {
        nombre: "Pino",
        descripcion: "Madera ligera y económica, ideal para muebles sencillos.",
        badge: "Económico",
        imagenUrl: "https://example.com/imagenes/pino.jpg",
        precio_m2: 350.0,
      },
      {
        nombre: "Roble",
        descripcion:
          "Madera dura y resistente, muy usada en muebles de alta gama.",
        badge: "Premium",
        imagenUrl: "https://example.com/imagenes/roble.jpg",
        precio_m2: 980.5,
      },
      {
        nombre: "Caoba",
        descripcion:
          "Madera fina de tono rojizo, apreciada por su durabilidad y belleza.",
        badge: "Exclusivo",
        imagenUrl: "https://example.com/imagenes/caoba.jpg",
        precio_m2: 1450.0,
      },
      {
        nombre: "Encino",
        descripcion: "Madera robusta, resistente a la humedad y al desgaste.",
        badge: null,
        imagenUrl: "https://example.com/imagenes/encino.jpg",
        precio_m2: 720.0,
      },
    ],
  });

  // ----- Herrajes -----
  const herrajes = await prisma.herraje.createMany({
    data: [
      {
        nombre: "Bisagra de acero inoxidable",
        descripcion:
          "Bisagra resistente a la corrosión, ideal para exteriores.",
        precio_unidad: 45.0,
      },
      {
        nombre: "Tirador de bronce",
        descripcion: "Acabado clásico para muebles de estilo rústico.",
        precio_unidad: 89.9,
      },
      {
        nombre: "Riel telescópico",
        descripcion: "Permite extensión total de cajones, soporta hasta 35kg.",
        precio_unidad: 210.0,
      },
      {
        nombre: "Tornillo autorroscante 1 1/2 pulg",
        descripcion: null,
        precio_unidad: 1.5,
      },
    ],
  });

  // ----- Acabados -----
  const acabados = await prisma.acabado.createMany({
    data: [
      {
        nombre: "Barniz mate",
        precio_extra: 120.0,
        tipo: "Barniz",
      },
      {
        nombre: "Laca brillante",
        precio_extra: 180.0,
        tipo: "Laca",
      },
      {
        nombre: "Tinte natural",
        precio_extra: 95.0,
        tipo: "Tinte",
      },
      {
        nombre: "Pintura color blanco",
        precio_extra: 150.0,
        tipo: "Pintura",
      },
    ],
  });

  console.log(`✅ Maderas creadas: ${maderas.count}`);
  console.log(`✅ Herrajes creados: ${herrajes.count}`);
  console.log(`✅ Acabados creados: ${acabados.count}`);
  console.log("🌱 Seed finalizado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
