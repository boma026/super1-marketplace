
import { addMinutes, parseISO } from "date-fns";
import { CreateBooking } from "../types/CreateBooking";
import { cancelBookingModel, createBookingModel, findByIdBookingModel, findOverlappingBookingModel, findProviderBookingsModel, findVariationModel } from "../model/bookingModel";

export interface CreateBookingInput {
  customerId: string;
  providerId: string;
  serviceId: string;
  variationId: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
}

export const createBooking = async (data: CreateBooking) => {
  const { customerId, providerId, serviceId, variationId, date, time } = data;

  const variation = await findVariationModel(variationId);
  if (!variation) throw new Error("Variação não encontrada");

  // Converte a string "YYYY-MM-DDTHH:mm:00" para objeto Date
  const startAt = parseISO(`${date}T${time}:00`);

  // Soma a duração da variação ao horário inicial para calcular o fim
  const endAt = addMinutes(startAt, variation.durationMinutes);


  // Verifica conflitos
  const conflict = await findOverlappingBookingModel(providerId, startAt, endAt);
  if (conflict) throw new Error("Horário já reservado");

  return createBookingModel({
  customerId,
  providerId,
  serviceId,
  variationId,
  startAt,
  endAt,
  price: variation.price,
  status: "CONFIRMED" as const,
  canceledAt: null,
});
}

export const getProviderBookings = async (providerId: string) => {

  const bookings = await findProviderBookingsModel(providerId);

  return bookings;
};

 export const cancelBooking = async (bookingId: string) => {
    const booking = await findByIdBookingModel(bookingId);

    if (!booking) {
      throw new Error("Booking não encontrado.");
    }

    const updated = await cancelBookingModel(bookingId);

    return updated;
  }