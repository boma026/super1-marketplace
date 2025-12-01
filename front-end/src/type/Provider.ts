import type { UserRole } from '../enum/userRole';
import type { Availability } from './Availability';

export type Provider = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	bio: string | null;
	phone: string | null;
	city: string | null;
	neighborhood: string | null;
	createdAt: Date;
	updatedAt: Date;
	availabilities: Availability[];
};
