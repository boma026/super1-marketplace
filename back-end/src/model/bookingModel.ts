import type { Booking } from "@prisma/client";
import { prisma } from "../lib/prisma/prisma";

export const createBookingModel = async (data: Omit<Booking, "id" | "createdAt">): Promise<Booking> => {
    try {
        const booking = await prisma.booking.create({
            data,
        });
        return booking;
    } catch (error) {
        throw new Error(`Erro ao criar reserva: ${error}`);
    }
};

export const findOverlappingBookingModel = async (
    providerId: string,
    startAt: Date,
    endAt: Date
) => {
    try {
        const overlappingBooking = await prisma.booking.findFirst({
            where: {
                providerId,
                AND: [
                    // startAt < endAt da reserva existente (começa antes do fim da outra)
                    { startAt: { lt: endAt } },

                    // endAt > startAt da reserva existente (termina depois do início da outra)
                    // Essas duas condições juntas detectam sobreposição de horários
                    { endAt: { gt: startAt } },
                ],
                status: { not: "CANCELLED" }, // considera apenas reservas ativas
            },
        });
        return overlappingBooking;
    } catch (error) {
        throw new Error(`Erro ao buscar reserva conflitante: ${error}`);
    }
};

export const findVariationModel = async (variationId: string) => {
    try {
        const variation = await prisma.serviceVariation.findUnique({
            where: { id: variationId },
        });
        return variation;
    } catch (error) {
        throw new Error(`Erro ao buscar variação do serviço: ${error}`);
    }
};

export const findProviderBookingsModel = async (providerId: string) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { providerId },
            include: {
                customer: true,
                service: true,
                variation: true
            },
            orderBy: {
                startAt: "asc",
            },
        });
        return bookings;
    } catch (error) {
        throw new Error(`Erro ao buscar reservas do provider: ${error}`);
    }
};

export const findByIdBookingModel = async (id: string) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                customer: true,
                provider: true,
            },
        });
        return booking;
    } catch (error) {
        throw new Error(`Erro ao buscar reserva por ID: ${error}`);
    }
};

export const cancelBookingModel = async (id: string) => {
    try {
        const booking = await prisma.booking.update({
            where: { id },
            data: {
                status: "CANCELLED",
                canceledAt: new Date(), // registra quando foi cancelada
            },
        });
        return booking;
    } catch (error) {
        throw new Error(`Erro ao cancelar reserva: ${error}`);
    }
};
