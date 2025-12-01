import type { Booking } from "@prisma/client";
import { prisma } from "../../libs/prisma/prisma";

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

// Verifica se há reservas conflitantes para um provider
export const findOverlappingBookingModel = async (providerId: string, startAt: Date, endAt: Date) => {
    try {
        const overlappingBooking = await prisma.booking.findFirst({
            where: {
                providerId,
                AND: [
                    { startAt: { lt: endAt } },
                    { endAt: { gt: startAt } },
                ],
                status: { not: "CANCELLED" },
            },
        });
        return overlappingBooking;
    } catch (error) {
        throw new Error(`Erro ao buscar reserva conflitante: ${error}`);
    }
};

// Busca variação do serviço
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
                startAt: "asc"
            }
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
                canceledAt: new Date(),
            },
        });
        return booking;
    } catch (error) {
        throw new Error(`Erro ao cancelar reserva: ${error}`);
    }
};
