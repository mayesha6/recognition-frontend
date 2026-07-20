export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | "Free" | string;
  billingCycle: string;
  features: string[];
  allocatedPoints?: number;
  userLimit?: number;
}