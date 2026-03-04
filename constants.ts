import { ServiceCategory, ServicePackage, VehicleSize } from './types';
import { Droplets, Car, ShieldCheck } from 'lucide-react';

export const DOWN_PAYMENT_PERCENTAGE = 0.30; // 30%

export const SERVICES: ServicePackage[] = [
  {
    id: 'lube-premium',
    category: ServiceCategory.LUBE,
    name: 'Lube & Go Premium',
    description: 'Full synthetic oil change, filter replacement, and safety check.',
    durationHours: 1,
    prices: {
      [VehicleSize.SMALL]: 2500,
      [VehicleSize.MEDIUM]: 3200,
      [VehicleSize.LARGE]: 3800,
      [VehicleSize.EXTRA_LARGE]: 4500,
    }
  },
  {
    id: 'grooming-interior',
    category: ServiceCategory.GROOMING,
    name: 'Interior Detailing',
    description: 'Deep cleaning of seats, carpets, dashboard, and sanitation.',
    durationHours: 3,
    prices: {
      [VehicleSize.SMALL]: 2700,
      [VehicleSize.MEDIUM]: 3700,
      [VehicleSize.LARGE]: 4500,
      [VehicleSize.EXTRA_LARGE]: 5200,
    }
  },
  {
    id: 'grooming-exterior',
    category: ServiceCategory.GROOMING,
    name: 'Exterior Detailing',
    description: 'Multi-step wash, clay bar, polish, and wax application.',
    durationHours: 3,
    prices: {
      [VehicleSize.SMALL]: 3800,
      [VehicleSize.MEDIUM]: 4800,
      [VehicleSize.LARGE]: 5800,
      [VehicleSize.EXTRA_LARGE]: 6800,
    }
  },
  {
    id: 'grooming-full',
    category: ServiceCategory.GROOMING,
    name: 'Full Detailing',
    description: 'Complete interior and exterior restoration package.',
    durationHours: 6,
    prices: {
      [VehicleSize.SMALL]: 5500,
      [VehicleSize.MEDIUM]: 7300,
      [VehicleSize.LARGE]: 8800,
      [VehicleSize.EXTRA_LARGE]: 9500,
    }
  },
  {
    id: 'ceramic-coating',
    category: ServiceCategory.COATING,
    name: 'Ceramic Coating (3 Years)',
    description: 'Premium 9H ceramic protection for ultimate shine and durability.',
    durationHours: 8,
    prices: {
      [VehicleSize.SMALL]: 12000,
      [VehicleSize.MEDIUM]: 15000,
      [VehicleSize.LARGE]: 18000,
      [VehicleSize.EXTRA_LARGE]: 22000,
    }
  }
];

export const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export const SERVICE_ICONS: Record<ServiceCategory, any> = {
  [ServiceCategory.LUBE]: Droplets,
  [ServiceCategory.GROOMING]: Car,
  [ServiceCategory.COATING]: ShieldCheck,
};

export const PAYMENT_METHODS = [
  {
    id: 'gcash',
    name: 'GCash',
    number: '0917-123-4567',
    accountName: 'Wash & Go Baliwag'
  },
  {
    id: 'bdo',
    name: 'BDO Bank Transfer',
    number: '0012-3456-7890',
    accountName: 'Wash & Go Services Inc.'
  }
];