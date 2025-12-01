import type { Provider } from "./Provider";
import type { ServiceType } from "./ServiceType";
import type { ServiceVariation } from "./ServiceVariation";

export type Service = {
  id: string;
  name: string;
  description?: string;
  providerId: string;
  provider: Provider;
  type: ServiceType;
  variations: ServiceVariation[];
  photos?: string[];
};
