export type CreateServiceProps = {
  providerId: string;
  name: string;
  description: string | null;
  variations: {
    name: string;
    price: number;
    durationMinutes: number;
  }[];
  photos: string[];
  serviceType: string
};
