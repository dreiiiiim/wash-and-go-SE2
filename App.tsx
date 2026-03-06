import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import ServicesAndRates from './components/ServicesAndRates';
import CheckStatus from './components/CheckStatus';
import AuthPage from './components/AuthPage';
import { Booking, BookingStatus } from './types';

// Shared user type — exported so AuthPage can import it
export type AppUser = {
  name: string;
  email: string;
  isStaff: boolean;
};

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

export type ViewType = 'HOME' | 'CLIENT' | 'ADMIN' | 'SERVICES' | 'STATUS' | 'AUTH';

export default function App() {
  const [view, setView] = useState<ViewType>('HOME');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [user, setUser] = useState<AppUser | null>(null);

  const handleNewBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    alert("Booking Submitted Successfully! Please wait for confirmation.");
    setView('HOME');
  };

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleAddUpdate = (id: string, message: string, imageUrl?: string) => {
    const newUpdate = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      message,
      imageUrl,
    };
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, updates: [...(b.updates || []), newUpdate] } : b
    ));
  };

  const handleAuthSuccess = (loggedInUser: AppUser) => {
    setUser(loggedInUser);
    setView(loggedInUser.isStaff ? 'ADMIN' : 'CLIENT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setView('HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (newView: ViewType) => {
    if (newView === 'CLIENT' && !user) {
      setView('AUTH');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentView={view} onViewChange={handleViewChange} user={user} onLogout={handleLogout} />

      <main className={`flex-grow ${view !== 'HOME' ? 'container mx-auto px-4 py-8' : ''}`}>
        {view === 'HOME' && (
          <HomePage onViewChange={handleViewChange} />
        )}
        {view === 'AUTH' && (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        )}
        {view === 'CLIENT' && (
          <BookingWizard onSubmit={handleNewBooking} />
        )}
        {view === 'SERVICES' && (
          <ServicesAndRates onBookNow={() => handleViewChange('CLIENT')} />
        )}
        {view === 'STATUS' && (
          <CheckStatus bookings={bookings} />
        )}
        {view === 'ADMIN' && (
          <AdminDashboard bookings={bookings} onUpdateStatus={handleUpdateStatus} onAddUpdate={handleAddUpdate} />
        )}
      </main>

      <footer className="text-white py-6 text-center text-sm" style={{ backgroundColor: '#383838' }}>
        <p>&copy; {new Date().getFullYear()} Wash &amp; Go Baliwag Branch. All rights reserved.</p>
      </footer>
    </div>
  );
}