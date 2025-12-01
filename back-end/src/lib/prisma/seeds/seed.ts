import { prisma } from "../prisma";

// Popular os tipos de serviço
async function main() {
  const serviceTypes = [
    "Manicure",
    "Pedicure",
    "Corte de cabelo",
    "Coloracao",
    "Depilacao",
    "Maquiagem",
    "Massagem",
    "Estetica facial"
  ];

  // Para cada tipo, faz upsert 
  for (const typeName of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { name: typeName },
      update: {}, // Não atualiza nada se já existir
      create: {
        name: typeName,
        // Gera slug: tudo minúsculo e espaços viram hífen
        slug: typeName.toLowerCase().replace(/\s+/g, "-")
      }
    });
  }

  console.log("Service types seed completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect(); 
  });
