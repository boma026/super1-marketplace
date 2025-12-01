export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface Service {
  id: string;
  name: string;
  photos: string[];
}

export interface Variation {
  id: string;
  name: string;
  price: number;            
  durationMinutes: number;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  variationId: string;
  startAt: string;         
  endAt: string;            
  price: number | null;
  status: string;

  customer: Customer;
  service: Service;
  variation: Variation;
}
