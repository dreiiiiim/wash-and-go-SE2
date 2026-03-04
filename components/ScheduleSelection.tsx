import React, { useState } from 'react';
import { TIME_SLOTS } from '../constants';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';

interface ScheduleSelectionProps {
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
  serviceDuration: number;
}

export default function ScheduleSelection({ onSelect, onBack, serviceDuration }: ScheduleSelectionProps) {
  const today = startOfToday();
  // Default to tomorrow to be safe
  const [selectedDate, setSelectedDate] = useState<string>(format(addDays(today, 1), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock function to check availability
  // In a real app, this would fetch from backend based on `selectedDate` and `serviceDuration`
  const getSlotAvailability = (time: string) => {
    // Randomly disable slots to simulate capacity
    // Hash based on date + time string to be consistent per render
    const hash = (selectedDate + time).split('').reduce((a,b)=>a+b.charCodeAt(0),0);
    return hash % 5 !== 0; // 20% chance of being booked
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-3xl italic font-black text-gray-900 mb-8 text-center">SELECT SCHEDULE</h2>

      <div className="mb-8">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          <CalendarIcon size={14} /> Preferred Date
        </label>
        <div className="relative">
            <input
            type="date"
            min={format(today, 'yyyy-MM-dd')}
            value={selectedDate}
            onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime(''); // Reset time when date changes
            }}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-lg text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
            />
            {/* Custom calendar icon overlay can be added here with absolute positioning if native picker icon isn't enough */}
        </div>
      </div>

      <div className="mb-10">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          <Clock size={14} /> Available Slots
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map((time) => {
            const isAvailable = getSlotAvailability(time);
            return (
              <button
                key={time}
                disabled={!isAvailable}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${
                  !isAvailable 
                    ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed decoration-slice'
                    : selectedTime === time
                        ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {time}
                {!isAvailable && <span className="block text-[10px] font-normal">Fully Booked</span>}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-2">* Note: Service duration is approx {serviceDuration} hours.</p>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900">
          BACK
        </button>
        <button 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-colors ${
            selectedDate && selectedTime ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          PROCEED
        </button>
      </div>
    </div>
  );
}