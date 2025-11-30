import { RequestHandler } from "express";

import { CreateBooking } from "../types/CreateBooking";
import { createBooking } from "../service/bookingService";

export const createBookingController: RequestHandler = async (req, res) => {
  try {
    const customerId = req.user!.id;
    const { serviceId, providerId, variationId, date, time } = req.body;

    const data: CreateBooking = { customerId, providerId, serviceId, variationId, date, time };

    // O service retorna os dados validados
    const booking = await createBooking(data);

    return res.status(201).json({ success: true, booking });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message || "Erro ao criar reserva" });
  }
};
