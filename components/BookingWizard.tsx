import React, { useState } from 'react';
import { Booking, ServicePackage, VehicleSize, FuelType } from '../types';
import ServiceSelection from './ServiceSelection';
import VehicleSelection from './VehicleSelection';
import ScheduleSelection from './ScheduleSelection';
import PaymentForm from './PaymentForm';

interface BookingWizardProps {
  onSubmit: (booking: Booking) => void;
}

type Step = 1 | 2 | 3 | 4;

export default function BookingWizard({ onSubmit }: BookingWizardProps) {
  const [step, setStep] = useState<Step>(1);
  
  // Form State
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
  const [vehicleSize, setVehicleSize] = useState<VehicleSize | null>(null);
  const [fuelType, setFuelType] = useState<FuelType | null>(null);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  
  const handleServiceSelect = (service: ServicePackage) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleVehicleSelect = (size: VehicleSize, fuel?: FuelType) => {
    setVehicleSize(size);
    if (fuel) setFuelType(fuel);
    setStep(3);
  };

  const handleScheduleSelect = (dateStr: string, timeStr: string) => {
    setDate(dateStr);
    setTimeSlot(timeStr);
    setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => (prev - 1) as Step);
  };

  // Calculate the correct price based on service type
  const calculatePrice = (): number => {
    if (!selectedService || !vehicleSize) return 0;

    // Lube flat pricing — use lubePrices if available and fuel type is selected
    if (selectedService.isLubeFlat && selectedService.lubePrices && fuelType) {
      return selectedService.lubePrices[fuelType];
    }

    // Lube flat pricing — Express (no fuel type selected, use first price)
    if (selectedService.isLubeFlat) {
      return Object.values(selectedService.prices)[0];
    }

    // Standard pricing — by vehicle size
    return selectedService.prices[vehicleSize];
  };

  const handleFinalSubmit = (customerDetails: { name: string, phone: string, proof: string }) => {
    if (!selectedService || !vehicleSize || !date || !timeSlot) return;

    const price = calculatePrice();
    const downPayment = price * 0.30;

    const newBooking: Booking = {
      id: `BK-${Math.floor(Math.random() * 1000000)}`,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      vehicleSize: vehicleSize,
      vehicleType: selectedService.vehicleType || undefined,
      fuelType: fuelType || undefined,
      oilType: selectedService.oilType || undefined,
      date: date,
      timeSlot: timeSlot,
      totalPrice: price,
      downPaymentAmount: downPayment,
      status: 'PENDING' as any,
      paymentProofUrl: customerDetails.proof,
      createdAt: Date.now()
    };

    onSubmit(newBooking);
    // Reset form
    setStep(1);
    setSelectedService(null);
    setVehicleSize(null);
    setFuelType(null);
    setDate('');
    setTimeSlot('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
          {[
            { num: 1, label: 'SERVICE' },
            { num: 2, label: 'VEHICLE' },
            { num: 3, label: 'SCHEDULE' },
            { num: 4, label: 'PAYMENT' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center bg-gray-50 px-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= s.num ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s.num}
              </div>
              <span className={`mt-2 text-xs font-bold tracking-wider ${step >= s.num ? 'text-orange-600' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[400px]">
        {step === 1 && (
          <ServiceSelection onSelect={handleServiceSelect} />
        )}

        {step === 2 && selectedService && (
          <VehicleSelection 
            service={selectedService}
            onSelect={handleVehicleSelect}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <ScheduleSelection 
            onSelect={handleScheduleSelect} 
            onBack={handleBack}
            serviceDuration={selectedService?.durationHours || 1}
          />
        )}

        {step === 4 && selectedService && vehicleSize && (
          <PaymentForm 
            service={selectedService}
            vehicleSize={vehicleSize}
            fuelType={fuelType}
            date={date}
            timeSlot={timeSlot}
            onBack={handleBack}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>
    </div>
  );
}