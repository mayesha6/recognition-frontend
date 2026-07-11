export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | "Free";
  billingCycle: string;
  features: string[];
}