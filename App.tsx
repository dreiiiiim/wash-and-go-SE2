import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import ServicesAndRates from './components/ServicesAndRates';
import CheckStatus from './components/CheckStatus';
import { Booking } from './types';

// Mock initial data
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-170752',
    customerName: 'Juan Dela Cruz',
    customerPhone: '09170001234',
    serviceId: 'grooming-full',
    serviceName: 'Full Detailing',
    vehicleSize: 'MEDIUM' as any,
    date: '2025-02-15',
    timeSlot: '08:00 AM',
    totalPrice: 7300,
    downPaymentAmount: 2190,
    status: 'CONFIRMED' as any,
    createdAt: Date.now()
  }
];

export default function App() {
  const [view, setView] = useState<'CLIENT' | 'ADMIN' | 'SERVICES' | 'STATUS'>('CLIENT');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleNewBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    alert("Booking Submitted Successfully! Please wait for confirmation.");
    setView('CLIENT'); // Reset to home
  };

  const handleUpdateStatus = (id: string, status: any) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentView={view} onViewChange={setView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'CLIENT' && (
          <BookingWizard onSubmit={handleNewBooking} />
        )}
        {view === 'SERVICES' && (
          <ServicesAndRates />
        )}
        {view === 'STATUS' && (
          <CheckStatus bookings={bookings} />
        )}
        {view === 'ADMIN' && (
          <AdminDashboard bookings={bookings} onUpdateStatus={handleUpdateStatus} />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Wash & Go Baliwag Branch. All rights reserved.</p>
      </footer>
    </div>
  );
}