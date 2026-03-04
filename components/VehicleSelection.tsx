import React from 'react';
import { VehicleSize, FuelType, ServiceCategory } from '../types';
import { Car, Truck } from 'lucide-react';

interface VehicleSelectionProps {
  serviceCategory: ServiceCategory;
  onSelect: (size: VehicleSize, fuel?: FuelType) => void;
  onBack: () => void;
}

export default function VehicleSelection({ serviceCategory, onSelect, onBack }: VehicleSelectionProps) {
  const [selectedSize, setSelectedSize] = React.useState<VehicleSize | null>(null);
  const [selectedFuel, setSelectedFuel] = React.useState<FuelType | null>(null);

  const sizes = [
    { id: VehicleSize.SMALL, label: 'SMALL', desc: 'Sedan / Hatchback' },
    { id: VehicleSize.MEDIUM, label: 'MEDIUM', desc: 'Compact SUV / Crossover' },
    { id: VehicleSize.LARGE, label: 'LARGE', desc: 'SUV / Pick-up / Van' },
    { id: VehicleSize.EXTRA_LARGE, label: 'EXTRA LARGE', desc: 'Full-size Van / L300' },
  ];

  const handleContinue = () => {
    if (selectedSize) {
      if (serviceCategory === ServiceCategory.LUBE && !selectedFuel) {
        alert("Please select a fuel type.");
        return;
      }
      onSelect(selectedSize, selectedFuel || undefined);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl italic font-black text-gray-900 mb-2 text-center">SELECT VEHICLE</h2>
      <p className="text-gray-500 mb-8 text-center">We need to know the size of your vehicle for accurate pricing.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {sizes.map((s) => (
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
            </div>
            <div className={`${selectedSize === s.id ? 'text-orange-600' : 'text-gray-300'}`}>
              <Car size={32} />
            </div>
          </button>
        ))}
      </div>

      {serviceCategory === ServiceCategory.LUBE && (
        <div className="mb-8 border-t pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">FUEL TYPE</h3>
           <div className="flex justify-center gap-4">
             {[FuelType.GAS, FuelType.DIESEL].map(f => (
               <button
                key={f}
                onClick={() => setSelectedFuel(f)}
                className={`px-8 py-3 rounded-lg font-bold border-2 transition-all ${
                  selectedFuel === f 
                  ? 'border-orange-500 bg-orange-50 text-orange-700' 
                  : 'border-gray-200 text-gray-600'
                }`}
               >
                 {f}
               </button>
             ))}
           </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900">
          BACK
        </button>
        <button 
          onClick={handleContinue}
          disabled={!selectedSize}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-colors ${
            selectedSize ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          PROCEED
        </button>
      </div>
    </div>
  );
}