// controller/availabilityController.ts
import { RequestHandler } from "express";
import { getAvailabilityService, updateAvailabilityService } from "../service/availabilityService";


export const createAvailabilityController: RequestHandler = async (req, res) => {
  try {
    const providerId = req.user!.id;
    const {weekday, startTime, endTime } = req.body;

    const updatedAvailability = await updateAvailabilityService({ providerId, weekday, startTime, endTime });

    return res.status(201).json(updatedAvailability);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Erro ao adicionar horário" });
  }
};

export const getAvailabilityController: RequestHandler = async (req, res) => {
  try {

    const providerId = req.user!.id;

    const availability = await getAvailabilityService(providerId);

    return res.status(200).json(availability);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Erro ao buscar disponibilidade." });
  }
};

