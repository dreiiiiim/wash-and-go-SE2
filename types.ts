export enum ServiceCategory {
  LUBE = 'LUBE',
  GROOMING = 'GROOMING',
  COATING = 'COATING'
}

export enum VehicleSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE'
}

export enum FuelType {
  GAS = 'GAS',
  DIESEL = 'DIESEL'
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface ServicePackage {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  prices: Record<VehicleSize, number>;
  durationHours: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  vehicleSize: VehicleSize;
  fuelType?: FuelType; // For Lube
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  totalPrice: number;
  downPaymentAmount: number;
  status: BookingStatus;
  paymentProofUrl?: string; // Mocked URL
  createdAt: number;
}

export interface TimeSlot {
  time: string; // "08:00 AM"
  available: boolean;
}