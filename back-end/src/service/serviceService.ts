import { createServiceModel, getServicesModel } from "../model/serviceModel";
import { CreateServiceProps } from "../types/CreateService";

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

  variations.forEach(v => {
    if (!v.name.trim()) throw new Error("Variação precisa de nome.");
    if (v.price <= 0) throw new Error("Preço inválido."); // agora price é number
    if (v.durationMinutes <= 0) throw new Error("Duração inválida.");
  });

  // Validação das fotos (AGORA: strings)
  if (photos && photos.length > 0) {
    photos.forEach(name => {
      if (typeof name !== "string" || !name.trim()) {
        throw new Error("Nome de foto inválido.");
      }

      // valida extensão da imagem
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
