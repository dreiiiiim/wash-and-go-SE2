import React, { useMemo } from 'react';
import { SERVICES, SERVICE_ICONS } from '../constants';
import { ServicePackage, ServiceCategory } from '../types';

interface ServiceSelectionProps {
  onSelect: (service: ServicePackage) => void;
}

export default function ServiceSelection({ onSelect }: ServiceSelectionProps) {
  
  const groupedServices = useMemo(() => {
    // Grouping logic if needed, but for now we list distinct categories to match UI
    // The UI shows 3 main cards: Lube, Grooming, Coating. 
    // However, the data has multiple sub-services for Grooming.
    // Let's display the main categories first, or if detail is needed, display all.
    // Based on prompt image 1, it shows "Lube", "Auto Grooming", "Ceramic Coating" as main buttons.
    // But then Image 2 shows "Interior", "Exterior", "Full" under Grooming.
    // To simplify: I will render all specific packages grouped by category.
    return SERVICES;
  }, []);

  // Unique categories for the top level selection
  const categories = [ServiceCategory.LUBE, ServiceCategory.GROOMING, ServiceCategory.COATING];
  const [activeCategory, setActiveCategory] = React.useState<ServiceCategory | null>(null);

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

  // Show Sub-services for the selected category
  const subServices = groupedServices.filter(s => s.category === activeCategory);
  const Icon = SERVICE_ICONS[activeCategory];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setActiveCategory(null)} className="text-sm text-gray-500 hover:text-orange-600 font-bold">
          &larr; BACK
        </button>
        <div className="flex items-center gap-2">
            <div className="bg-gray-900 text-white p-2 rounded-lg"><Icon size={20} /></div>
            <h2 className="text-2xl font-black italic text-gray-900">
            {activeCategory === 'LUBE' ? 'LUBE & GO' : activeCategory === 'GROOMING' ? 'AUTO GROOMING' : 'CERAMIC COATING'}
            </h2>
        </div>
      </div>

      <p className="text-gray-500 mb-8">Select a specific package.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subServices.map((service) => (
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
                    <span className="text-sm text-gray-500">Starts at</span>
                    <span className="text-2xl font-bold text-gray-900">
                        ₱{Object.values(service.prices)[0].toLocaleString()}
                    </span>
                </div>
                <button
                onClick={() => onSelect(service)}
                className="w-full py-3 bg-gray-900 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
                >
                SELECT PACKAGE
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}