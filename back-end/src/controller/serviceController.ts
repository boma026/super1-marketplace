import { RequestHandler } from "express";
import { createService, getServices } from "../service/serviceService";

export const createServiceController: RequestHandler = async (req, res) => {
  try {
    const providerId = req.user!.id;
    
    const { name, description, variations, serviceType } = req.body;
    const photosFiles = req.files as Express.Multer.File[];

if (!photosFiles || photosFiles.length === 0) {
  throw new Error("Nenhuma foto enviada.");
}

    const photos = photosFiles.map((file) => `/uploads/services/${file.filename}`);

    const parsedVariations = JSON.parse(variations);

    const service = await createService({
      providerId,
      name,
      description,
      variations: parsedVariations,
      photos,
      serviceType
    });
    return res.status(201).json(service);

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Erro ao criar serviço" });
  }
};

export const getServicesController: RequestHandler = async (req, res) => {
  try {
    const providerId = req.user!.id;
    const services = await getServices(providerId);
    return res.status(200).json(services);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

