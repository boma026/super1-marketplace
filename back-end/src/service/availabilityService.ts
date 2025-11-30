// service/availabilityService.ts
import { getAvailabilityModel, updateAvailabilityModel } from "../model/availabilityModel";
import { CreateAvailabilityProps } from "../types/CreateAvailabilityProps";

export const updateAvailabilityService = async ({ providerId, weekday, endTime, startTime }: CreateAvailabilityProps) => {
  if (!weekday || !startTime || !endTime || !providerId) {
    throw new Error("Dia e horário são obrigatórios.");
  }
  return await updateAvailabilityModel({providerId, weekday, endTime, startTime});
};

export const getAvailabilityService = async (providerId: string) => {
  
  if (!providerId) {
    throw new Error("Provider ID inválido.");
  }

  const availability = await getAvailabilityModel(providerId);

  return availability;
};