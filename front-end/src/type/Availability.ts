import type { Weekday } from '../enum/weekday';

export type Availability = {
	id: string;
	providerId: string;
	weekday: Weekday;
	startTime: string | null;
	endTime: string | null;
	startAt: Date | null;
	endAt: Date | null;
};
