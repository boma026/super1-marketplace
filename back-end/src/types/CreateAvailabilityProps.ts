import { Weekday } from "@prisma/client"

export type CreateAvailabilityProps = { 
    providerId: string,
    weekday: Weekday,
    startTime: string,
    endTime: string
}