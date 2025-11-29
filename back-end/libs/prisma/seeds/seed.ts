import { prisma } from "../prisma";

async function main() {
  const serviceTypes = [
    "Manicure",
    "Pedicure",
    "Corte de cabelo",
    "Coloração",
    "Depilação",
    "Maquiagem",
    "Massagem",
    "Estética facial"
  ];

  for (const typeName of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { name: typeName },
      update: {},
      create: {
        name: typeName,
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
