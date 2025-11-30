import { PUBLIC_API_URL } from "$env/static/public";
import { serviceTypes } from "../constants/serviceTypes";


export const featuredServices = serviceTypes.map((service) => {
  const imageName = service.toLowerCase().replace(/\s+/g, "_");

  return {
    name: service,
    imageUrl: `${PUBLIC_API_URL}/uploads/services/${imageName}.jpg`
  };
});
