import { API_URL } from '../constants/API_URL';
import { serviceTypes } from '../constants/serviceTypes';

export const featuredServices = serviceTypes.map((service) => {
	const imageName = service.toLowerCase().replace(/\s+/g, '_');

	return {
		name: service,
		imageUrl: `${API_URL}/uploads/services/${imageName}.jpg`
	};
});
