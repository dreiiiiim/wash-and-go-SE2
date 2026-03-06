import React from 'react';
import { VehicleSize, FuelType, ServiceCategory, ServicePackage } from '../types';
import { Car, Bike } from 'lucide-react';

interface VehicleSelectionProps {
  service: ServicePackage;
  onSelect: (size: VehicleSize, fuel?: FuelType) => void;
  onBack: () => void;
}

export default function VehicleSelection({ service, onSelect, onBack }: VehicleSelectionProps) {
  const [selectedSize, setSelectedSize] = React.useState<VehicleSize | null>(null);
  const [selectedFuel, setSelectedFuel] = React.useState<FuelType | null>(null);

  const isLubeFlat = service.isLubeFlat;
  const isLube = service.category === ServiceCategory.LUBE;

  const sizes = [
    { id: VehicleSize.SMALL, label: 'SMALL', desc: 'Sedan / Hatchback' },
    { id: VehicleSize.MEDIUM, label: 'MEDIUM', desc: 'Compact SUV / Crossover' },
    { id: VehicleSize.LARGE, label: 'LARGE', desc: 'SUV / Pick-up / Van' },
    { id: VehicleSize.EXTRA_LARGE, label: 'EXTRA LARGE', desc: 'Full-size Van / L300' },
  ];

  const motorcycleSizes = [
    { id: VehicleSize.SMALL, label: 'SMALL', desc: 'Scooter / Underbone' },
    { id: VehicleSize.MEDIUM, label: 'MEDIUM', desc: 'Standard / Sport' },
    { id: VehicleSize.LARGE, label: 'LARGE', desc: 'Touring / Adventure' },
    { id: VehicleSize.EXTRA_LARGE, label: 'EXTRA LARGE', desc: 'Big Bike / Heavy Touring' },
  ];

  const isMotorcycle = service.vehicleType === 'MOTORCYCLE';
  const sizeOptions = isMotorcycle ? motorcycleSizes : sizes;

  // For Lube Express — no size needed, just confirm fuel
  // For Lube Premium — fuel type selection needed
  // The fuel type is already embedded in the service for Express packages
  const needsFuelSelection = isLube && service.lubePrices && 
    service.lubePrices[FuelType.GAS] !== service.lubePrices[FuelType.DIESEL];

  // Lube Express already has fuel type baked in (Express Gas / Express Diesel)
  const isExpressLube = isLubeFlat && service.lubePackageType === 'EXPRESS';

  const handleContinue = () => {
    if (isExpressLube) {
      // Express lube: no size or fuel selection needed, just pass SMALL as placeholder
      onSelect(VehicleSize.SMALL, undefined);
      return;
    }

    if (isLubeFlat && needsFuelSelection) {
      // Premium lube: only fuel type matters
      if (!selectedFuel) {
        alert("Please select a fuel type.");
        return;
      }
      onSelect(VehicleSize.SMALL, selectedFuel);
      return;
    }

    if (!selectedSize) {
      alert("Please select a vehicle size.");
      return;
    }

    onSelect(selectedSize, selectedFuel || undefined);
  };

  // Get price for display
  const getPrice = (size: VehicleSize): number => {
    return service.prices[size];
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl italic font-black text-gray-900 mb-2 text-center">
        {isExpressLube ? 'CONFIRM SELECTION' : isLubeFlat ? 'SELECT FUEL TYPE' : 'SELECT VEHICLE'}
      </h2>
      <p className="text-gray-500 mb-2 text-center">
        {isExpressLube
          ? `You selected ${service.name}. Confirm to proceed.`
          : isLubeFlat
          ? 'Select your fuel type for accurate pricing.'
          : isMotorcycle
          ? 'Select the size of your motorcycle for accurate pricing.'
          : 'Select the size of your vehicle for accurate pricing.'
        }
      </p>

      {/* Service summary badge */}
      <div className="flex justify-center mb-8">
        <span className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-1.5 rounded-full text-sm font-bold">
          {service.name}
        </span>
      </div>

      {/* ============ LUBE EXPRESS: Just a confirmation ============ */}
      {isExpressLube && (
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
          <div className="text-3xl font-black text-gray-900 mb-2">
            ₱{Object.values(service.prices)[0].toLocaleString()}
          </div>
          <p className="text-gray-500 text-sm">{service.description}</p>
        </div>
      )}

      {/* ============ LUBE PREMIUM: Fuel type only ============ */}
      {isLubeFlat && !isExpressLube && needsFuelSelection && (
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[FuelType.GAS, FuelType.DIESEL].map(f => {
              const price = service.lubePrices?.[f] || 0;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFuel(f)}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    selectedFuel === f
                      ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className={`font-black text-xl mb-1 ${selectedFuel === f ? 'text-orange-700' : 'text-gray-900'}`}>
                    {f}
                  </span>
                  <span className="text-xs text-gray-500 mb-3">{f === 'GAS' ? '4 Liters' : '7 Liters'}</span>
                  <span className={`text-2xl font-black ${selectedFuel === f ? 'text-orange-600' : 'text-gray-800'}`}>
                    ₱{price.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ============ SIZE SELECTION: Grooming & Ceramic ============ */}
      {!isLubeFlat && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sizeOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSize(s.id)}
              className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                selectedSize === s.id
                  ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <h4 className={`font-bold text-lg ${selectedSize === s.id ? 'text-orange-700' : 'text-gray-900'}`}>
                  {s.label}
                </h4>
                <p className="text-sm text-gray-500">{s.desc}</p>
                <p className={`text-lg font-bold mt-1 ${selectedSize === s.id ? 'text-orange-600' : 'text-gray-700'}`}>
                  ₱{getPrice(s.id).toLocaleString()}
                </p>
              </div>
              <div className={`${selectedSize === s.id ? 'text-orange-600' : 'text-gray-300'}`}>
                {isMotorcycle ? <Bike size={32} /> : <Car size={32} />}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900">
          BACK
        </button>
        <button 
          onClick={handleContinue}
          disabled={!isExpressLube && !isLubeFlat && !selectedSize}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-colors ${
            (isExpressLube || (isLubeFlat && (selectedFuel || !needsFuelSelection)) || selectedSize)
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          PROCEED
        </button>
      </div>
    </div>
  );
}