import React, { useMemo } from 'react';
import { SERVICES, SERVICE_ICONS } from '../constants';
import { ServicePackage, ServiceCategory, LubePackageType, FuelType, VehicleType } from '../types';
import { Car, Bike } from 'lucide-react';

interface ServiceSelectionProps {
  onSelect: (service: ServicePackage) => void;
}

export default function ServiceSelection({ onSelect }: ServiceSelectionProps) {
  const categories = [ServiceCategory.LUBE, ServiceCategory.GROOMING, ServiceCategory.COATING];
  const [activeCategory, setActiveCategory] = React.useState<ServiceCategory | null>(null);
  
  // Lube sub-flow
  const [lubeSubCategory, setLubeSubCategory] = React.useState<LubePackageType | null>(null);

  // Ceramic sub-flow: step 1 = vehicle type, step 2 = duration
  const [ceramicVehicleType, setCeramicVehicleType] = React.useState<VehicleType | null>(null);
  const [ceramicDuration, setCeramicDuration] = React.useState<string | null>(null);

  // Filter services by category
  const subServices = useMemo(() => {
    if (!activeCategory) return [];
    let filtered = SERVICES.filter(s => s.category === activeCategory);
    
    // For Lube, filter by sub-category
    if (activeCategory === ServiceCategory.LUBE && lubeSubCategory) {
      filtered = filtered.filter(s => s.lubePackageType === lubeSubCategory);
    }

    // For Ceramic, filter by vehicle type and duration
    if (activeCategory === ServiceCategory.COATING) {
      if (ceramicVehicleType) {
        filtered = filtered.filter(s => s.vehicleType === ceramicVehicleType);
      }
      if (ceramicDuration) {
        filtered = filtered.filter(s => s.id.includes(ceramicDuration));
      }
    }
    
    return filtered;
  }, [activeCategory, lubeSubCategory, ceramicVehicleType, ceramicDuration]);

  const handleBack = () => {
    if (activeCategory === ServiceCategory.LUBE && lubeSubCategory) {
      setLubeSubCategory(null);
    } else if (activeCategory === ServiceCategory.COATING && ceramicDuration) {
      setCeramicDuration(null);
    } else if (activeCategory === ServiceCategory.COATING && ceramicVehicleType) {
      setCeramicVehicleType(null);
    } else {
      setActiveCategory(null);
      setLubeSubCategory(null);
      setCeramicVehicleType(null);
      setCeramicDuration(null);
    }
  };

  // ============================================================
  // STEP 1: Category Selection
  // ============================================================
  if (!activeCategory) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl italic font-black text-gray-900 mb-2">SELECT SERVICE</h2>
        <p className="text-gray-500 mb-8">Choose a professional treatment for your machine.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = SERVICE_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="group flex flex-col items-center justify-center p-10 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-700">
                  {cat === 'LUBE' ? 'LUBE & GO' : cat === 'GROOMING' ? 'AUTO GROOMING' : 'CERAMIC COATING'}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================
  // LUBE: Sub-category Selection (Express vs Premium)
  // ============================================================
  if (activeCategory === ServiceCategory.LUBE && !lubeSubCategory) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="text-sm text-gray-500 hover:text-orange-600 font-bold">
            &larr; BACK
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              {React.createElement(SERVICE_ICONS[ServiceCategory.LUBE], { size: 20 })}
            </div>
            <h2 className="text-2xl font-black italic text-gray-900">LUBE & GO</h2>
          </div>
        </div>

        <p className="text-gray-500 mb-8">Choose your package type.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EXPRESS */}
          <button
            onClick={() => setLubeSubCategory(LubePackageType.EXPRESS)}
            className="group flex flex-col items-start p-8 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="bg-gray-800 text-white px-4 py-1.5 rounded font-bold text-sm uppercase tracking-widest mb-4">
              EXPRESS
            </div>
            <p className="text-sm text-gray-500 italic mb-4">
              Engine Oil, Oil Filter, Labor, FREE Standard Car Wash
            </p>
            <div className="flex gap-6 text-gray-700">
              <div>
                <span className="text-xs text-gray-400 block">Gas (4L)</span>
                <span className="text-xl font-black">₱1,400</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Diesel (7L)</span>
                <span className="text-xl font-black">₱1,900</span>
              </div>
            </div>
          </button>

          {/* PREMIUM */}
          <button
            onClick={() => setLubeSubCategory(LubePackageType.PREMIUM)}
            className="group flex flex-col items-start p-8 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="bg-orange-600 text-white px-4 py-1.5 rounded font-bold text-sm uppercase tracking-widest mb-4">
              PREMIUM
            </div>
            <p className="text-sm text-gray-500 italic mb-4">
              Engine Oil, Oil Filter, Labor, Engine Flushing, FREE Standard Car Wash
            </p>
            <div className="text-gray-700">
              <span className="text-xs text-gray-400 block">Starting at</span>
              <span className="text-xl font-black">₱1,650</span>
              <span className="text-sm text-gray-400 ml-1">— ₱4,250</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // CERAMIC: Step 1 — Vehicle Type (Car or Motorcycle)
  // ============================================================
  if (activeCategory === ServiceCategory.COATING && !ceramicVehicleType) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="text-sm text-gray-500 hover:text-orange-600 font-bold">
            &larr; BACK
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              {React.createElement(SERVICE_ICONS[ServiceCategory.COATING], { size: 20 })}
            </div>
            <h2 className="text-2xl font-black italic text-gray-900">CERAMIC COATING</h2>
          </div>
        </div>

        <p className="text-gray-500 mb-8">What type of vehicle are you coating?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => setCeramicVehicleType(VehicleType.VEHICLE)}
            className="group flex flex-col items-center justify-center p-10 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Car size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700">VEHICLE</h3>
            <p className="text-sm text-gray-500 mt-1">Car / SUV / Van / Pick-up</p>
          </button>

          <button
            onClick={() => setCeramicVehicleType(VehicleType.MOTORCYCLE)}
            className="group flex flex-col items-center justify-center p-10 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Bike size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700">MOTORCYCLE</h3>
            <p className="text-sm text-gray-500 mt-1">Scooter / Sport / Big Bike</p>
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // CERAMIC: Step 2 — Duration (1yr / 3yr / 5yr)
  // ============================================================
  if (activeCategory === ServiceCategory.COATING && ceramicVehicleType && !ceramicDuration) {
    const isVehicle = ceramicVehicleType === VehicleType.VEHICLE;
    const durations = [
      { key: '1yr', label: '1 YEAR', priceRange: isVehicle ? '₱9,500 — ₱12,500' : '₱2,750 — ₱3,250' },
      { key: '3yr', label: '3 YEARS', priceRange: isVehicle ? '₱11,000 — ₱15,000' : '₱3,000 — ₱3,600', popular: true },
      { key: '5yr', label: '5 YEARS', priceRange: isVehicle ? '₱14,000 — ₱18,000' : '₱3,300 — ₱3,900' },
    ];

    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="text-sm text-gray-500 hover:text-orange-600 font-bold">
            &larr; BACK
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              {React.createElement(SERVICE_ICONS[ServiceCategory.COATING], { size: 20 })}
            </div>
            <h2 className="text-2xl font-black italic text-gray-900">
              CERAMIC COATING — {ceramicVehicleType}
            </h2>
          </div>
        </div>

        <p className="text-gray-500 mb-8">Choose your protection duration.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {durations.map((d) => (
            <button
              key={d.key}
              onClick={() => {
                setCeramicDuration(d.key);
                // Find the matching service and auto-select it
                const match = SERVICES.find(
                  s => s.category === ServiceCategory.COATING &&
                       s.vehicleType === ceramicVehicleType &&
                       s.id.includes(d.key)
                );
                if (match) onSelect(match);
              }}
              className={`group relative flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-transparent hover:border-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300 ${
                d.popular ? 'ring-2 ring-orange-200' : ''
              }`}
            >
              {d.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              )}
              <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-orange-700">{d.label}</h3>
              <p className="text-sm text-gray-500 mb-4">Protection</p>
              <div className="text-orange-600 font-bold text-lg">{d.priceRange}</div>
              <p className="text-xs text-gray-400 mt-1">Depends on size</p>
            </button>
          ))}
        </div>

        <div className="bg-gray-100 rounded-xl p-4 mt-8 text-xs md:text-sm text-gray-600 text-center">
          <span className="font-bold">INCLUSIONS:</span> Standard Car Wash, Asphalt Removal, Exterior Detailing, Watermarks/Acid Rain Removal, Paint Correction (Double Step Buffing)
        </div>
      </div>
    );
  }

  // ============================================================
  // GENERIC: Sub-service list (Lube Express/Premium cards, Grooming cards)
  // ============================================================
  const Icon = SERVICE_ICONS[activeCategory];
  const categoryTitle = activeCategory === 'LUBE' 
    ? `LUBE & GO — ${lubeSubCategory}` 
    : activeCategory === 'GROOMING' 
    ? 'AUTO GROOMING' 
    : 'CERAMIC COATING';

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-sm text-gray-500 hover:text-orange-600 font-bold">
          &larr; BACK
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-gray-900 text-white p-2 rounded-lg"><Icon size={20} /></div>
          <h2 className="text-2xl font-black italic text-gray-900">{categoryTitle}</h2>
        </div>
      </div>

      <p className="text-gray-500 mb-8">Select a specific package.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subServices.map((service) => {
          // Determine display price
          const isLube = service.isLubeFlat && service.lubePrices;
          let priceLabel: string;
          let priceSubLabel: string = '';

          if (isLube && service.lubePrices) {
            const gasPrice = service.lubePrices[FuelType.GAS];
            const dieselPrice = service.lubePrices[FuelType.DIESEL];
            if (gasPrice === dieselPrice) {
              priceLabel = `₱${gasPrice.toLocaleString()}`;
              priceSubLabel = 'Flat rate';
            } else {
              priceLabel = `₱${gasPrice.toLocaleString()}`;
              priceSubLabel = `Gas | ₱${dieselPrice.toLocaleString()} Diesel`;
            }
          } else {
            const minPrice = Math.min(...(Object.values(service.prices) as number[]));
            priceLabel = `₱${minPrice.toLocaleString()}`;
            priceSubLabel = 'Starts at';
          }

          return (
            <div key={service.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-orange-500 pb-2 inline-block">
                  {service.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm mt-2 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Est. Duration: {service.durationHours} hrs
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm text-gray-500">{priceSubLabel}</span>
                  <span className="text-2xl font-bold text-gray-900">{priceLabel}</span>
                </div>
                <button
                  onClick={() => onSelect(service)}
                  className="w-full py-3 bg-gray-900 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
                >
                  SELECT PACKAGE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}