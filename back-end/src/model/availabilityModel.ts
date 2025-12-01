// model/availabilityModel.ts

import { Weekday } from "@prisma/client";
import { prisma } from "../lib/prisma/prisma";
import { CreateAvailabilityProps } from "../types/CreateAvailabilityProps";


export const updateAvailabilityModel = async ({
  providerId,
  weekday,
  startTime,
  endTime
}: CreateAvailabilityProps) => {
  return await prisma.availability.upsert({
    where: {
      providerId_weekday: {
        providerId,
        weekday: Weekday[weekday] // converte string -> enum
      }
    },
    create: {
      providerId,
      weekday: Weekday[weekday],
      startTime,
      endTime
    },
    update: {
      startTime,
      endTime
    }
  });
};



export const getAvailabilityModel = async (providerId: string) => {
    try {
        return await prisma.availability.findMany({
            where: { providerId },
            orderBy: { weekday: "asc" }
        });
    } catch (error) {
        throw new Error("Não foi possível cadastrar no banco de dados");
    }
};
