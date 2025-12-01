import { RequestHandler } from "express";

import { CreateBooking } from "../types/CreateBooking";
import { cancelBooking, createBooking, getProviderBookings } from "../service/bookingService";

export const createBookingController: RequestHandler = async (req, res) => {
  try {
    const customerId = req.user!.id;
    const { serviceId, providerId, variationId, date, time } = req.body;

    const data: CreateBooking = { customerId, providerId, serviceId, variationId, date, time };

    const booking = await createBooking(data);

    return res.status(201).json({ success: true, booking });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message || "Erro ao criar reserva" });
  }
};

export const getProviderBookingsController: RequestHandler = async (req, res) => {
  try {
    const providerId = req.user!.id;

    const bookings = await getProviderBookings(providerId);

    return res.status(200).json({ bookings });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message || "Erro ao buscar reservas" });
  }
};

export const cancelBookingController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Não foi possivel cancelar o agendamento" });
    }

    const booking = await cancelBooking(id);

    return res.status(200).json({ message: "Booking cancelado com sucesso.", booking });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
