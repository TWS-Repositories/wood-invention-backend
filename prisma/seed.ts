import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env["DATABASE_URL"]!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.acabado.deleteMany();
  await prisma.herraje.deleteMany();
  await prisma.madera.deleteMany();

  const maderas = await prisma.madera.createMany({
    data: [
      {
        nombre: "Pino",
        descripcion: "Madera ligera y económica, ideal para muebles sencillos.",
        badge: "Económico",
        imagen_url: "https://example.com/imagenes/pino.jpg",
        precio_m2: 350.0,
      },
      {
        nombre: "Roble",
        descripcion:
          "Madera dura y resistente, muy usada en muebles de alta gama.",
        badge: "Premium",
        imagen_url: "https://example.com/imagenes/roble.jpg",
        precio_m2: 980.5,
      },
      {
        nombre: "Caoba",
        descripcion:
          "Madera fina de tono rojizo, apreciada por su durabilidad y belleza.",
        badge: "Exclusivo",
        imagen_url: "https://example.com/imagenes/caoba.jpg",
        precio_m2: 1450.0,
      },
      {
        nombre: "Encino",
        descripcion: "Madera robusta, resistente a la humedad y al desgaste.",
        badge: null,
        imagen_url: "https://example.com/imagenes/encino.jpg",
        precio_m2: 720.0,
      },
      {
        nombre: "Nogal",
        descripcion:
          "Madera de alta calidad con vetas elegantes y gran durabilidad.",
        badge: "Premium",
        imagen_url: "https://example.com/imagenes/nogal.jpg",
        precio_m2: 1650.0,
      },
      {
        nombre: "Cedro",
        descripcion: "Madera aromática y resistente a insectos y humedad.",
        badge: "Natural",
        imagen_url: "https://example.com/imagenes/cedro.jpg",
        precio_m2: 890.0,
      },
      {
        nombre: "Parota",
        descripcion:
          "Madera tropical con vetas llamativas y excelente estabilidad.",
        badge: "Exclusivo",
        imagen_url: "https://example.com/imagenes/parota.jpg",
        precio_m2: 1850.0,
      },
      {
        nombre: "Tzalam",
        descripcion: "Madera mexicana de gran resistencia y acabado elegante.",
        badge: "Premium",
        imagen_url: "https://example.com/imagenes/tzalam.jpg",
        precio_m2: 1350.0,
      },
      {
        nombre: "Maple",
        descripcion: "Madera clara y uniforme, ideal para diseños modernos.",
        badge: "Moderno",
        imagen_url: "https://example.com/imagenes/maple.jpg",
        precio_m2: 1120.0,
      },
    ],
  });

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
      {
        nombre: "Bisagra de cierre suave",
        descripcion:
          "Permite el cierre silencioso y gradual de puertas de muebles.",
        precio_unidad: 95.0,
      },
      {
        nombre: "Corredera oculta",
        descripcion:
          "Sistema de deslizamiento oculto para cajones de alta gama.",
        precio_unidad: 320.0,
      },
      {
        nombre: "Pistón hidráulico",
        descripcion: "Facilita la apertura y cierre de puertas abatibles.",
        precio_unidad: 145.0,
      },
      {
        nombre: "Jaladera de aluminio",
        descripcion:
          "Jaladera moderna con acabado cepillado para cocinas y closets.",
        precio_unidad: 75.0,
      },
      {
        nombre: "Soporte metálico para repisa",
        descripcion: "Soporte resistente para repisas de madera o cristal.",
        precio_unidad: 58.0,
      },
    ],
  });

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
