import { redis } from "../lib/redis/redis";
import { createServiceModel, findServicesByTypeModel, getServicesModel } from "../model/serviceModel";
import { CreateServiceProps } from "../types/CreateServiceProps";

export const createService = async ({
  providerId,
  name,
  description,
  variations,
  photos,
  serviceType
}: CreateServiceProps) => {

  if (!providerId) {
    throw new Error("providerId é obrigatório.");
  }

  if (!name || name.trim() === "") {
    throw new Error("Nome é obrigatório.");
  }

  if (!variations || !variations.length) {
    throw new Error("É necessário enviar ao menos uma variação.");
  }

  // Valida cada variação (nome, preço e duração)
  variations.forEach(v => {
    if (!v.name.trim()) throw new Error("Variação precisa de nome.");
    if (v.price <= 0) throw new Error("Preço inválido.");
    if (v.durationMinutes <= 0) throw new Error("Duração inválida.");
  });

  // Verifica se as fotos têm extensão permitida
  if (photos && photos.length > 0) {
    photos.forEach(name => {
      if (typeof name !== "string" || !name.trim()) {
        throw new Error("Nome de foto inválido.");
      }

      const allowed = [".jpg", ".jpeg", ".png", ".webp"];
      const lower = name.toLowerCase();

      if (!allowed.some(ext => lower.endsWith(ext))) {
        throw new Error(`Arquivo inválido: ${name}. Somente imagens são permitidas.`);
      }
    });
  }
  return await createServiceModel({
    providerId,
    name,
    description,
    variations,
    photos,
    serviceType
  });
};

export const getServices = async (providerId: string) => {
  if (!providerId) throw new Error("Provider ID inválido");
  const services = await getServicesModel(providerId);
  return services;
};

// Busca serviços por tipo com cache de 10 minutos
export const getServicesByType = async (type: string) => {
  const cacheKey = `services:type:${type.toLowerCase()}`;

  // Retorna do cache se existir
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("CACHE HIT:", cacheKey);
    return JSON.parse(cached);
  }

  // Se não estiver em cache, busca no BD e armazena por 600s
  const services = await findServicesByTypeModel(type);
  await redis.set(cacheKey, JSON.stringify(services), "EX", 600);

  return services;
};
