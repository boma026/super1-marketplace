import { prisma } from "../../libs/prisma/prisma";
import { CreateServiceProps } from "../types/CreateService";

export const createServiceModel = async ({
  providerId,
  name,
  description,
  variations,
  photos,
  serviceType
}: CreateServiceProps) => {
  try {
    const type = await prisma.serviceType.findUnique({
      where: { name: serviceType }
    });

    if (!type) {
      throw new Error("Tipo de serviço não encontrado");
    }

    const service = await prisma.service.create({
      data: {
        providerId,
        name,
        description,
        photos,
        typeId: type.id,
        variations: {
          create: variations.map(v => ({
            name: v.name,
            price: v.price,
            durationMinutes: v.durationMinutes
          }))
        }
      },
      include: {
        variations: true,
        type: true,
      }
    });

    return service;

  } catch (e: any) {
    throw new Error(`Erro ao criar o serviço: ${e.message || e}`);
  }
};

export const getServicesModel = async (providerId: string) => {
  return prisma.service.findMany({
    where: { providerId },
    include: { variations: true, type: true }
  });
};
